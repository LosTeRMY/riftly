import { useState } from "react";
import { getPUUID } from "../../api/riot";

const REGIONS = ["EUW", "NA", "EUNE", "KR"];

interface LinkAccountModalProps {
  onClose: () => void;
  onSuccess: (name: string, tag: string, region: string) => Promise<void>;
  zIndex?: number;
}

export default function LinkAccountModal({ onClose, onSuccess, zIndex = 110 }: Readonly<LinkAccountModalProps>) {
  const [input, setInput] = useState("");
  const [region, setRegion] = useState("EUW");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const parts = input.trim().split("#");
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      setError("Format: GameName#TAG");
      return;
    }

    const [name, tag] = parts;
    setLoading(true);

    try {
      await getPUUID(name, tag);
      await onSuccess(name, tag, region);
      onClose();
    } catch {
      setError("Account not found. Check your GameName#TAG.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="fixed inset-0" style={{ zIndex: zIndex - 1 }} onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex }}>
        <div className="bg-surface-container-low border border-[#00FF94]/30 rounded-lg shadow-2xl w-80 p-6 pointer-events-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-headline text-sm font-bold tracking-tight uppercase">Link your LoL account</h3>
            <button onClick={onClose} className="text-on-surface-variant hover:text-white transition-colors">
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="GameName#TAG"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2 text-sm text-white placeholder:text-on-surface-variant/50 focus:outline-none focus:border-[#00FF94]/50 font-label"
            />
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00FF94]/50 font-label"
            >
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            {error && <p className="text-red-400 text-xs font-label">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-primary-container text-on-primary font-bold rounded hover:bg-primary-fixed-dim transition-colors text-sm font-label disabled:opacity-50"
            >
              {loading ? "Checking..." : "Link account"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import type { LinkedAccount } from "../../hooks/useLinkedAccounts";
import LinkAccountModal from "./LinkAccountModal";

const REGIONS = [
  { value: "EUW", label: "EU West (EUW)" },
  { value: "EUNE", label: "EU Nordic & East (EUNE)" },
  { value: "NA", label: "North America (NA)" },
  { value: "KR", label: "Korea (KR)" },
];

interface SettingsModalProps {
  onClose: () => void;
  accounts: LinkedAccount[];
  onAddAccount: (name: string, tag: string, region: string) => Promise<void>;
  onRemoveAccount: (id: string) => Promise<void>;
  onSetPrimary: (id: string) => Promise<void>;
}

export default function SettingsModal({ onClose, accounts, onAddAccount, onRemoveAccount, onSetPrimary }: Readonly<SettingsModalProps>) {
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [defaultRegion, setDefaultRegion] = useState(() => localStorage.getItem("defaultRegion") ?? "EUW");

  function handleSave() {
    localStorage.setItem("defaultRegion", defaultRegion);
    onClose();
  }

  return (
    <>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-sm">
        <div className="bg-[#1b1b20] w-full max-w-lg rounded-xl border-l-4 border-[#00FF94] shadow-2xl overflow-hidden relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#b9cbbb] hover:text-[#00FF94] transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-headline font-bold text-white mb-8">Account Settings</h2>

            {/* Linked Accounts */}
            <div className="mb-8">
              <h3 className="text-xs font-label uppercase tracking-widest text-[#b9cbbb] opacity-60 mb-4">Linked Accounts</h3>
              <div className="space-y-3">
                {accounts.length === 0 && (
                  <p className="text-[#b9cbbb]/50 text-sm font-label text-center py-4">No linked accounts yet.</p>
                )}
                {accounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between p-4 bg-[#131318] rounded-lg border border-outline-variant/20">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-body font-bold">{account.summoner_name}#{account.summoner_tag}</span>
                        {account.is_primary && (
                          <span className="bg-[#00FF94]/10 text-[#00FF94] text-[10px] font-label font-bold px-2 py-0.5 rounded uppercase">Primary</span>
                        )}
                      </div>
                      <span className="text-[#b9cbbb] text-xs font-label uppercase opacity-50">{account.summoner_region}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {!account.is_primary && (
                        <button
                          onClick={() => onSetPrimary(account.id)}
                          className="text-xs font-label uppercase tracking-wider text-[#b9cbbb] hover:text-[#00FF94] transition-colors"
                        >
                          Set as Primary
                        </button>
                      )}
                      <button
                        onClick={() => onRemoveAccount(account.id)}
                        className="text-[#b9cbbb] hover:text-red-400 transition-colors"
                      >
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowAddAccount(true)}
                className="mt-4 w-full py-3 border border-[#00FF94]/30 text-[#00FF94] hover:bg-[#00FF94]/5 rounded-lg font-label font-bold text-sm uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-lg">add</span>
                Add Account
              </button>
            </div>

            {/* Default Region */}
            <div className="mb-4">
              <h3 className="text-xs font-label uppercase tracking-widest text-[#b9cbbb] opacity-60 mb-4">Default Region</h3>
              <div className="relative">
                <select
                  value={defaultRegion}
                  onChange={(e) => setDefaultRegion(e.target.value)}
                  className="w-full bg-[#131318] border border-outline-variant/20 text-white rounded-lg px-4 py-3 font-label text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-[#00FF94] cursor-pointer"
                >
                  {REGIONS.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[#b9cbbb]">
                  <span className="material-symbols-outlined text-sm">expand_more</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-[#131318] p-6 flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-[#b9cbbb] hover:text-white font-label font-bold text-sm uppercase tracking-wider transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-8 py-2.5 bg-[#00FF94] text-[#00210e] rounded font-label font-bold text-sm uppercase tracking-wider hover:bg-[#00e383] shadow-[0_0_15px_rgba(0,255,148,0.1)] transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {showAddAccount && (
        <LinkAccountModal
          onClose={() => setShowAddAccount(false)}
          onSuccess={onAddAccount}
          zIndex={300}
        />
      )}
    </>
  );
}

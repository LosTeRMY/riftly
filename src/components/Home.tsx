import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const REGIONS = ["EUW", "NA", "KR", "EUNE"];

const TRENDING = [
  { label: "Faker#KR1", href: "#" },
  { label: "Caps#EUW", href: "#" },
];

const GLOW_STYLE = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "1100px",
  height: "800px",
  pointerEvents: "none",
  background: `radial-gradient(ellipse at center,
    rgba(0, 255, 148, 0.042) 0%,
    rgba(0, 255, 148, 0.034) 10%,
    rgba(0, 255, 148, 0.024) 22%,
    rgba(0, 255, 148, 0.016) 35%,
    rgba(0, 255, 148, 0.009) 48%,
    rgba(0, 255, 148, 0.004) 60%,
    rgba(0, 255, 148, 0.001) 72%,
    transparent 82%)`,
} as const;

export default function Home() {
  const navigate = useNavigate();
  const [region, setRegion] = useState("EUW");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    if (!query.includes("#")) {
      setError("Invalid format — ex: Faker#KR1");
      return;
    }
    setError("");
    navigate(`/summoner/${region}/${encodeURIComponent(query.trim())}`);
  };

  useEffect(() => {
  document.body.style.overflow = 'hidden';
  return () => { document.body.style.overflow = ''; };
}, []);

  return (
    <main className="h-screen w-full flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Glow radial gradient */}
      <div
        style={GLOW_STYLE}
      />

      <div className="w-full max-w-3xl flex flex-col items-center z-10 relative">
        <h1 className="font-headline font-bold text-primary text-center mb-12 leading-[1.1] text-[clamp(3rem,7vw,4.5rem)] tracking-[-0.02em]">
          Track your game
        </h1>

        {/* Search bar */}
        <div className="glow-effect w-full flex items-center gap-2 p-2 bg-surface-container-low border border-outline-variant/30 rounded-xl transition-shadow duration-500">
          {/* Region selector */}
          <div className="relative shrink-0">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="appearance-none w-32 bg-surface-container text-on-surface font-label text-sm tracking-wider uppercase py-4 pl-4 pr-10 rounded-lg border-none outline-none cursor-pointer"
            >
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px]">
                expand_more
              </span>
            </div>
          </div>

          {/* Input */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Summoner Name + #TAG"
            className="flex-1 bg-transparent border-none outline-none text-on-surface font-body text-lg p-4 placeholder:text-on-surface-variant/50"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="shrink-0 bg-primary-container text-on-primary-container font-label font-bold text-sm tracking-wider uppercase py-4 px-8 rounded-lg border-none cursor-pointer flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,148,0.2)] transition-colors duration-150 whitespace-nowrap hover:bg-primary"
          >
            Search
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Trending */}
        <div className="mt-8 flex items-center gap-4 font-label text-sm text-on-surface-variant">
          <span className="uppercase text-[0.7rem] tracking-[0.15em] opacity-50">
            Trending:
          </span>
          {TRENDING.map((item, i) => (
            <span key={item.label} className="flex items-center gap-4">
              <a
                href={item.href}
                className="text-on-surface-variant no-underline transition-colors duration-150 hover:text-primary-container"
              >
                {item.label}
              </a>
              {i < TRENDING.length - 1 && <span className="opacity-30">•</span>}
            </span>
          ))}
        </div>

        <p className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 text-sm text-tertiary-fixed-dim font-label transition-opacity duration-500 ${error ? 'opacity-100' : 'opacity-0'}`}>
          {error}
        </p>

      </div>
    </main>
  );
}

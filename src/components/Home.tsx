import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const REGIONS = ["EUW", "NA", "KR", "EUNE"];

const TRENDING = [
  { label: "Hide on bush#KR1", region: "KR" },
  { label: "G2 Caps#1323", region: "EUW" },
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
    <main className="h-screen w-full flex flex-col items-center justify-center px-4 md:px-8 relative overflow-hidden">
      {/* Glow radial gradient */}
      <div style={GLOW_STYLE} />

      <div className="relative w-full max-w-3xl flex flex-col items-center z-10 mx-auto">
        <h1 className="font-headline font-bold text-primary text-center mb-8 md:mb-12 text-4xl md:text-7xl tracking-tight px-4">
          Track your game
        </h1>

        {/* Search bar */}
        <div className="glow-effect w-full flex flex-col md:flex-row items-center p-2 gap-2 bg-surface-container-low border border-outline-variant/30 rounded-xl transition-shadow duration-500">
          {/* Region selector */}
          <div className="relative w-full md:w-auto shrink-0">
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="appearance-none w-full md:w-32 bg-surface-container text-on-surface font-label text-sm tracking-wider uppercase py-3 md:py-4 pl-4 pr-10 rounded-lg border-none outline-none cursor-pointer"
            >
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </div>
          </div>

          {/* Input */}
          <div className="grow w-full relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Summoner Name + #TAG"
              className="w-full bg-transparent border-none outline-none text-on-surface font-body text-base md:text-lg px-4 py-3 md:py-4 placeholder:text-on-surface-variant/50"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="group w-full md:w-auto shrink-0 bg-primary-container text-on-primary-container font-label font-bold text-sm tracking-wider uppercase py-3 md:py-4 px-8 rounded-lg border-none cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,148,0.2)] transition-colors duration-150 hover:bg-primary"
          >
            <span>Search</span>
            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Trending */}
        <div className="mt-8 flex items-center gap-4 font-label text-sm text-on-surface-variant flex-wrap justify-center">
          <span className="uppercase text-[0.7rem] tracking-[0.15em] opacity-50">Trending:</span>
          {TRENDING.map((item, i) => (
            <span key={item.label} className="flex items-center gap-4">
              <Link
                to={`/summoner/${item.region}/${encodeURIComponent(item.label)}`}
                className="text-on-surface-variant no-underline transition-colors duration-150 hover:text-primary-container"
              >
                {item.label}
              </Link>
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

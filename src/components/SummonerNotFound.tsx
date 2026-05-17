import { Link } from "react-router-dom";

const BG_GLOW_STYLE = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "900px",
  height: "700px",
  pointerEvents: "none" as const,
  background: `radial-gradient(ellipse at center,
    rgba(0, 255, 148, 0.055) 0%,
    rgba(0, 255, 148, 0.042) 10%,
    rgba(0, 255, 148, 0.028) 22%,
    rgba(0, 255, 148, 0.018) 35%,
    rgba(0, 255, 148, 0.010) 48%,
    rgba(0, 255, 148, 0.004) 60%,
    rgba(0, 255, 148, 0.001) 72%,
    transparent 82%)`,
};

const ICON_GLOW_STYLE = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "220px",
  height: "220px",
  pointerEvents: "none" as const,
  background: `radial-gradient(circle at center,
    rgba(0, 255, 148, 0.10) 0%,
    rgba(0, 255, 148, 0.06) 25%,
    rgba(0, 255, 148, 0.02) 50%,
    rgba(0, 255, 148, 0.005) 70%,
    transparent 85%)`,
};

export default function SummonerNotFound() {
  return (
    <main className="grow flex flex-col items-center justify-center px-6 min-h-[calc(100vh-4rem)] relative">
      {/* Background glow */}
      <div style={BG_GLOW_STYLE} />

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div style={ICON_GLOW_STYLE} />
            <span
              className="material-symbols-outlined text-primary-container relative"
              style={{ fontSize: "6rem", fontVariationSettings: "'wght' 400" }}
            >
              person_search
            </span>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-4">
          <h1 className="font-display text-5xl md:text-7xl font-bold text-primary tracking-tighter">
            Summoner Not Found
          </h1>
          <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-lg mx-auto leading-relaxed">
            We couldn't find a player with that name and tag in the selected region. Please check your spelling and try again.
          </p>
        </div>

        {/* CTA */}
        <div className="pt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-10 py-4 bg-primary-container text-on-primary-container font-headline font-bold text-sm tracking-widest uppercase rounded-lg hover:shadow-[0_0_30px_rgba(0,255,148,0.3)] hover:scale-105 transition-all duration-300 group"
          >
            <span>Return to Home</span>
            <span className="material-symbols-outlined ml-2 transition-transform duration-300 group-hover:translate-x-1">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Technical badge */}
        <div className="pt-16">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-surface-container-lowest rounded-xl border border-outline-variant/10">
            <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse" />
            <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant/60">
              Search Protocol: Error 404_Null_Entry
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}

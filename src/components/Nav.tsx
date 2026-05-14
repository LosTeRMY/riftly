import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const NAV_LINKS = [
  { label: "Live Game", icon: "videogame_asset" },
  { label: "Champions", icon: "military_tech" },
  { label: "Leaderboards", icon: "leaderboard" },
  { label: "Pro View", icon: "workspace_premium" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isProfilePage = location.pathname.startsWith("/summoner/");

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-surface-container-low bg-background flex items-center justify-between px-8 h-16"
        role="navigation"
      >
        {/* Logo */}
        <span className="font-headline text-primary-container text-2xl font-black cursor-pointer" style={{ letterSpacing: "-0.04em" }}>
          <a href="/">RIFTLY</a>
        </span>

        {/* Nav links — hidden on mobile */}
        <div className="hidden md:flex items-center h-full">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to="/coming-soon"
              className="font-label text-on-surface-variant text-[0.8rem] uppercase tracking-widest px-5 flex items-center h-full transition-colors duration-200 hover:text-white hover:bg-surface-container-low"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Hamburger — mobile only, hidden on profile pages */}
        <button
          onClick={() => setMobileOpen(true)}
          className={`${isProfilePage ? "hidden" : "md:hidden"} absolute left-1/2 -translate-x-1/2 text-on-surface-variant hover:text-primary-container transition-colors`}
          aria-label="Menu"
        >
          <span className="material-symbols-outlined text-[24px]!">menu</span>
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-5">
          <button
            className="text-on-surface-variant border-none cursor-pointer transition-colors duration-200 p-0 hover:text-primary-container scale-90 md:scale-95"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[22px] block">notifications</span>
          </button>
          <button
            className="text-on-surface-variant border-none cursor-pointer transition-colors duration-200 p-0 hover:text-primary-container scale-90 md:scale-95"
            aria-label="Settings"
          >
            <span className="material-symbols-outlined text-[22px] block">settings</span>
          </button>
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden border border-outline-variant cursor-pointer">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh3Xenpj53jP2WJiVBJVccUACpn74XsTq8GOFfBSpmwMiroBxwAiIoeqet6mmOQw-T8c-a9xTrYpKzG5hT_C_94TQSKFYODxbSmhP16ZHXaaRyarsepIOdJCl0cuEa8xe_2mEmzaJOHA4Xl1MHJI7j8S1tEyr_KCUm5_-nKiUQzZR4t-SuObv2ynIgJtEvJ5E6G4F5lOWX2CCBbXsR8VBLinDNJB8V2BoCSirnj-nNDj-kARYxSq2z_yiqqpAV0IBVsaSi98KS_8Mb"
              alt="Summoner Profile Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </nav>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-60 bg-background/95 backdrop-blur-sm p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="font-headline text-2xl font-black text-primary-container" style={{ letterSpacing: "-0.04em" }}>
              Riftly
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-on-surface-variant hover:text-on-surface transition-colors"
              aria-label="Close navigation"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to="/coming-soon"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-5 px-5 py-4 rounded-xl text-on-surface-variant hover:bg-surface-container transition-all font-label text-lg"
              >
                <span className="material-symbols-outlined text-2xl">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

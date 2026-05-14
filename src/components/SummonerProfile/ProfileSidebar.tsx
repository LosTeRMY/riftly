import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function ProfileSidebar({
  gameName,
  tagLine,
  region,
  profileIconId,
}: {
  gameName: string;
  tagLine: string;
  region: string;
  profileIconId: number;
}) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const knownSuffixes = ["/dashboard", "/champions", "/lp-graph", "/settings"];
  const basePath = knownSuffixes.reduce(
    (path, suffix) => (path.endsWith(suffix) ? path.slice(0, -suffix.length) : path),
    location.pathname
  );

  const NAV_ITEMS = [
    { icon: "dashboard", label: "Dashboard", path: `${basePath}/dashboard` },
    { icon: "history", label: "Match History", path: basePath },
    { icon: "sports_esports", label: "Champions", path: `${basePath}/champions` },
    { icon: "trending_up", label: "LP Graph", path: `${basePath}/lp-graph` },
    { icon: "settings", label: "Settings", path: `${basePath}/settings` },
  ];

  const avatarSrc = `https://ddragon.leagueoflegends.com/cdn/16.8.1/img/profileicon/${profileIconId}.png`;

  const activeItem = NAV_ITEMS.find((item) => location.pathname === item.path);

  return (
    <>
      {/* Mobile top bar — sticky below global Nav */}
      <div className="lg:hidden sticky top-16 z-40 w-full h-14 bg-surface-container-low border-b border-outline-variant/20 flex items-center justify-between px-6">
        <span className="font-headline font-bold text-on-surface text-sm truncate">
          {gameName}
          <span className="text-on-surface-variant font-normal">#{tagLine}</span>
          {activeItem && (
            <span className="ml-2 text-primary-container font-normal">· {activeItem.label}</span>
          )}
        </span>
        <button
          onClick={() => setMobileOpen(true)}
          className="text-on-surface-variant hover:text-on-surface transition-colors"
          aria-label="Open navigation"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-60 bg-background/95 backdrop-blur-sm p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="text-2xl font-black tracking-tighter text-primary-container font-headline">
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

          {/* Summoner card */}
          <div className="flex items-center gap-4 mb-10 p-4 bg-surface-container rounded-xl">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant shrink-0">
              <img src={avatarSrc} alt="Summoner Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="font-headline font-bold text-on-surface text-lg leading-tight">
                {gameName}#{tagLine}
              </div>
              <div className="font-label text-sm text-on-surface-variant">{region}</div>
            </div>
          </div>

          {/* Nav links */}
          <div className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all ${
                  location.pathname === item.path
                    ? "bg-primary-container/10 text-primary-container font-semibold"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="font-label">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <nav className="hidden lg:flex flex-col py-8 bg-surface-container-low h-[calc(100vh-4rem)] w-64 fixed left-0 top-16 z-40 shadow-sidebar">
        <div className="px-8 mb-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant shrink-0">
            <img src={avatarSrc} alt="Summoner Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="font-headline font-bold text-on-surface text-lg leading-tight">
              {gameName}#{tagLine}
            </div>
            <div className="font-label text-sm text-on-surface-variant">{region}</div>
          </div>
        </div>

        <div className="flex-1 px-4 space-y-2 font-label">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-primary-container/10 text-primary-container border-r-4 border-primary-container font-semibold"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-white"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="px-8 mt-auto">
          <button className="w-full py-3 px-4 bg-surface-container hover:bg-surface-container-highest text-primary-fixed-dim font-headline font-bold rounded-lg transition-colors flex justify-center items-center gap-2">
            <span className="material-symbols-outlined text-sm">refresh</span>
            Refresh Stats
          </button>
        </div>
      </nav>
    </>
  );
}

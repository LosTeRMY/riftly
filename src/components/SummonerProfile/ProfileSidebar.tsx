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
  const knownSuffixes = ["/dashboard", "/champions", "/lp-graph", "/settings"];
  const basePath = knownSuffixes.reduce(
    (path, suffix) => (path.endsWith(suffix) ? path.slice(0, -suffix.length) : path),
    location.pathname
  );

  const NAV_ITEMS = [
    { icon: "dashboard", label: "Dashboard", path: `${basePath}/dashboard` },
    { icon: "history", label: "Match History", path: basePath },
    {
      icon: "sports_esports",
      label: "Champions",
      path: `${basePath}/champions`,
    },
    { icon: "trending_up", label: "LP Graph", path: `${basePath}/lp-graph` },
    { icon: "settings", label: "Settings", path: `${basePath}/settings` },
  ];
  return (
    <nav className="hidden md:flex flex-col py-8 bg-surface-container-low h-[calc(100vh-4rem)] w-64 fixed left-0 top-16 z-40 shadow-sidebar">
      <div className="px-8 mb-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant shrink-0">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/16.8.1/img/profileicon/${profileIconId}.png`}
            alt="Summoner Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="font-headline font-bold text-on-surface text-lg leading-tight">
            {gameName}#{tagLine}
          </div>
          <div className="font-label text-sm text-on-surface-variant">
            {region}
          </div>
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
  );
}

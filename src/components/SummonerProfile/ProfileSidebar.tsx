const NAV_ITEMS = [
  { icon: "dashboard", label: "Dashboard", active: false },
  { icon: "history", label: "Match History", active: true },
  { icon: "sports_esports", label: "Champions", active: false },
  { icon: "trending_up", label: "LP Graph", active: false },
  { icon: "settings", label: "Settings", active: false },
];

export default function ProfileSidebar({
  name,
  region,
}: {
  name: string;
  region: string;
}) {
    return (
  <nav className="hidden md:flex flex-col py-8 bg-surface-container-low h-[calc(100vh-4rem)] w-64 fixed left-0 top-16 z-40 shadow-sidebar">
    <div className="px-8 mb-8 flex items-center gap-4">
      <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant shrink-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh3Xenpj53jP2WJiVBJVccUACpn74XsTq8GOFfBSpmwMiroBxwAiIoeqet6mmOQw-T8c-a9xTrYpKzG5hT_C_94TQSKFYODxbSmhP16ZHXaaRyarsepIOdJCl0cuEa8xe_2mEmzaJOHA4Xl1MHJI7j8S1tEyr_KCUm5_-nKiUQzZR4t-SuObv2ynIgJtEvJ5E6G4F5lOWX2CCBbXsR8VBLinDNJB8V2BoCSirnj-nNDj-kARYxSq2z_yiqqpAV0IBVsaSi98KS_8Mb"
          alt="Summoner Avatar"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <div className="font-headline font-bold text-on-surface text-lg leading-tight">
          {name}
        </div>
        <div className="font-label text-sm text-on-surface-variant">
          {region}
        </div>
      </div>
    </div>

    <div className="flex-1 px-4 space-y-2 font-label">
      {NAV_ITEMS.map((item) => (
        <a
          key={item.label}
          href="#"
          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
            item.active
              ? "bg-primary-container/10 text-primary-container border-r-4 border-primary-container font-semibold"
              : "text-on-surface-variant hover:bg-surface-container hover:text-white"
          }`}
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          <span>{item.label}</span>
        </a>
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

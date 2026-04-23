const NAV_LINKS = ["Live Game", "Champions", "Leaderboards", "Pro View"];

export default function Nav() {
  return (
    <nav
      className="absolute top-0 left-0 right-0 z-50 border-b border-surface-container-low bg-background flex items-center justify-between px-8 h-16"
      role="navigation"
    >
      {/* Logo */}
      <span
        className="font-headline text-primary-container text-2xl font-black cursor-pointer"
        style={{ letterSpacing: "-0.04em" }}
      >
        RIFTLY
      </span>

      {/* Nav links */}
      <div className="flex items-center h-full">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className="font-label text-on-surface-variant text-[0.8rem] uppercase tracking-widest px-5 flex items-center h-full transition-colors duration-200
            hover:text-white
            hover:bg-surface-container-low"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-5">
        <button
          className="text-on-surface-variant bg-none border-none cursor-pointer transition-colors duration-200 p-0 hover:text-primary-container"
          aria-label="Notifications"
        >
          <span
            className="material-symbols-outlined text-[22px] block"
          >
            notifications
          </span>
        </button>
        <button
        className="text-on-surface-variant bg-none border-none cursor-pointer transition-colors duration-200 p-0 hover:text-primary-container"
          aria-label="Settings"
        >
          <span
            className="material-symbols-outlined text-[22px] block"
          >
            settings
          </span>
        </button>
        <div
          className="w-8 h-8 rounded-[50%] overflow-hidden border border-outline-variant cursor-pointer"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDh3Xenpj53jP2WJiVBJVccUACpn74XsTq8GOFfBSpmwMiroBxwAiIoeqet6mmOQw-T8c-a9xTrYpKzG5hT_C_94TQSKFYODxbSmhP16ZHXaaRyarsepIOdJCl0cuEa8xe_2mEmzaJOHA4Xl1MHJI7j8S1tEyr_KCUm5_-nKiUQzZR4t-SuObv2ynIgJtEvJ5E6G4F5lOWX2CCBbXsR8VBLinDNJB8V2BoCSirnj-nNDj-kARYxSq2z_yiqqpAV0IBVsaSi98KS_8Mb"
            alt="Summoner Profile Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}

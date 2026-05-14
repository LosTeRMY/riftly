export default function ProfileHeader({
  gameName,
  region,
  level,
  profileIconId,
  soloRank,
}: {
  gameName: string;
  tagLine: string;
  region: string;
  level: number;
  profileIconId: number;
  soloRank: any;
}) {
  return (
    <section className="mb-12 md:mb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

        {/* Profile identity */}
        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative shrink-0">
            <div className="w-20 h-20 md:w-32 md:h-32 overflow-hidden rounded-full border-2 border-surface-container-low">
              <img
                alt="Summoner Avatar"
                className="w-full h-full object-cover shadow-avatar"
                src={`https://ddragon.leagueoflegends.com/cdn/16.8.1/img/profileicon/${profileIconId}.png`}
              />
            </div>
            <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-surface-container-highest text-on-surface font-headline font-bold text-xs md:text-sm px-2 py-0.5 md:px-3 md:py-1 rounded-full border border-surface-container-lowest">
              {level}
            </div>
          </div>

          <div>
            <h1 className="font-headline text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-1 md:mb-2">
              {gameName}
            </h1>
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <span className="px-2 py-0.5 md:px-3 md:py-1 bg-surface-container text-on-surface-variant font-label text-[10px] md:text-sm rounded-lg uppercase tracking-widest">
                {region}
              </span>
              <span className="text-surface-container-highest hidden sm:inline">•</span>
              <span className="text-primary-fixed-dim font-label text-[10px] md:text-sm flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-[10px] md:text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  fiber_manual_record
                </span>
                Online
              </span>
            </div>
          </div>
        </div>

        {/* Rank & win rate */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 md:gap-12 w-full md:w-auto">
          <div className="relative z-10 bg-surface-container-low p-4 md:p-6 rounded-xl flex items-center gap-4 md:gap-6 shadow-rank w-full sm:w-auto">
            <div className="w-12 h-12 md:w-20 md:h-20 shrink-0">
              <img
                src={`/assets/${soloRank ? soloRank.tier.charAt(0) + soloRank.tier.slice(1).toLowerCase() : "unranked"}.webp`}
                alt="Rank emblem"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-headline text-lg md:text-3xl font-bold text-white leading-none mb-1">
                {soloRank
                  ? soloRank.tier.charAt(0) + soloRank.tier.slice(1).toLowerCase()
                  : "Unranked"}{" "}
                {soloRank ? soloRank.rank : ""}
              </div>
              <div className="font-headline text-base md:text-xl text-primary-fixed-dim font-semibold">
                {soloRank ? `${soloRank.leaguePoints} LP` : ""}
              </div>
            </div>
          </div>

          <div className="glass-glow w-full sm:w-auto -mt-4 sm:mt-0 pt-8 sm:pt-0 px-4 sm:px-0">
            <div className="font-headline text-4xl md:text-[3.5rem] leading-none font-extrabold text-primary">
              {soloRank
                ? `${((soloRank.wins / (soloRank.wins + soloRank.losses)) * 100).toFixed(1)}%`
                : "0%"}
            </div>
            <div className="font-label text-xs md:text-sm text-on-surface-variant uppercase tracking-widest mt-1">
              Win Rate (S16)
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

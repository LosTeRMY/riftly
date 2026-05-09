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
    <section className="mb-16">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between max-w-330">
        <div className="flex items-center gap-6">
          {/* profile icon */}
          <div className="relative w-fit">
            <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-full border-2 border-surface-container-low">
              <img
                alt="Summoner Avatar"
                className="w-full h-full object-cover  shadow-avatar"
                src={`https://ddragon.leagueoflegends.com/cdn/16.8.1/img/profileicon/${profileIconId}.png`}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-surface-container-highest text-on-surface font-headline font-bold text-sm px-3 py-1 rounded-full border border-surface-container-lowest">
              {level}
            </div>
          </div>
          {/* summoner name*/}
          <div>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-2">
              {gameName}
            </h1>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-surface-container text-on-surface-variant font-label text-sm rounded-lg uppercase tracking-widest">
                {region}
              </span>
              <span className="text-surface-container-highest">•</span>
              <span className="text-primary-fixed-dim font-label text-sm flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  fiber_manual_record
                </span>
                Online
              </span>
            </div>
          </div>
        </div>
        {/* rank and win Rate */}
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-16 ">
          <div className="bg-surface-container-low p-6 rounded-xl flex items-center gap-6 w-full sm:w-auto shadow-rank">
            <div className="w-16 h-16 md:w-20 md:h-20">
            <img
              src={`/assets/${soloRank ? soloRank.tier.charAt(0) + soloRank.tier.slice(1).toLowerCase() : "unranked"}.webp`}
              alt="Rank emblem"
              className="rounded-xl"
            />
            </div>
            <div>
              <div className="font-headline text-2xl md:text-3xl font-bold text-white leading-none mb-1 min-w-40">
                {soloRank
                  ? soloRank.tier.charAt(0) +
                    soloRank.tier.slice(1).toLowerCase()
                  : "Unranked"}{" "}
                {soloRank ? soloRank.rank : ""}
              </div>
              <div className="font-headline text-xl text-primary-fixed-dim font-semibold">
                {soloRank ? `${soloRank.leaguePoints} LP` : ""}
              </div>
            </div>
          </div>
          <div className="glass-glow text-right w-full sm:w-auto">
            <div className="font-headline text-[3.5rem] leading-none font-extrabold text-primary min-w-40 text-center">
              {soloRank
                ? `${((soloRank.wins / (soloRank.wins + soloRank.losses)) * 100).toFixed(1)}%`
                : "0%"}
            </div>
            <div className="font-label text-sm text-on-surface-variant uppercase tracking-widest mt-1">
              Win Rate (S16)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

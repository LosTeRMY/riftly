import { useChampionStats } from "../../../hooks/useChampionStats";

const DISPLAY_NAMES: Record<string, string> = {
  MonkeyKing: "Wukong",
};

export default function ChampionList({ puuid, region }: { puuid: string; region: string }) {
  const { champions, isLoading } = useChampionStats(puuid, region);

  if (isLoading) return <p className="text-on-surface-variant font-label">Loading champions...</p>;

  return (
    <section className="pb-16 pt-6 sm:pt-0">
      {/* Page Header */}
      <div className="mb-12 relative">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary-container/5 rounded-full blur-[80px] pointer-events-none" />
        <h1 className="font-headline text-5xl lg:text-6xl font-bold text-on-surface tracking-tighter mb-4 relative z-10">
          Champion <span className="text-on-surface-variant">Arsenal</span>
        </h1>
        <p className="font-body text-on-surface-variant text-lg max-w-2xl leading-relaxed">
          Performance documentation for Season 16. Sorted by deployment frequency.
        </p>
      </div>

      {/* Table */}
      <div className="flex flex-col gap-2">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 text-xs font-headline font-bold text-on-surface-variant uppercase tracking-[0.2em] border-b border-outline-variant/10 mb-2">
          <div className="col-span-6 sm:col-span-4">Champion</div>
          <div className="hidden sm:block col-span-2 text-center">Games</div>
          <div className="col-span-3 sm:col-span-2 text-center">Win Rate</div>
          <div className="col-span-3 sm:col-span-2 text-center">KDA Ratio</div>
          <div className="hidden sm:block col-span-2 text-right">CS / Min</div>
        </div>

        {/* Rows */}
        {champions.map((champion, i) => {
          const isWin = champion.winRate >= 50;
          const isEven = i % 2 === 0;
          return (
            <div
              key={champion.name}
              className={`group relative grid grid-cols-12 gap-4 px-6 py-5 rounded-xl transition-all duration-300 hover:bg-surface-container overflow-hidden ${
                isEven ? "bg-surface-container-lowest" : "bg-surface"
              }`}
            >
              {/* Left indicator */}
              <div
                className={`absolute left-0 top-0 bottom-0 ${
                  isWin
                    ? "w-1 bg-primary-container shadow-[0_0_15px_rgba(0,255,148,0.6)]"
                    : "w-[2px] bg-tertiary-container"
                }`}
              />

              {/* Champion */}
              <div className="col-span-6 sm:col-span-4 flex items-center gap-5">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 transition-transform duration-300 group-hover:scale-105 shadow-lg bg-surface-container-high">
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/16.8.1/img/champion/${champion.name.replace("'", "")}.png`}
                    alt={champion.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-headline text-xl font-bold text-on-surface tracking-tight">
                    {DISPLAY_NAMES[champion.name] ?? champion.name}
                  </span>
                </div>
              </div>

              {/* Games */}
              <div className="hidden sm:flex col-span-2 items-center justify-center">
                <span className="font-headline text-2xl font-medium text-on-surface">
                  {champion.games}
                </span>
              </div>

              {/* Win Rate */}
              <div className="col-span-3 sm:col-span-2 flex items-center justify-center relative">
                {isWin && (
                  <div className="absolute inset-0 bg-primary-container/10 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}
                <span
                  className={`font-headline text-3xl font-bold relative z-10 ${
                    isWin ? "text-primary-container" : "text-tertiary-container"
                  }`}
                >
                  {champion.winRate}%
                </span>
              </div>

              {/* KDA */}
              <div className="col-span-3 sm:col-span-2 flex items-center justify-center flex-col">
                <span className="font-headline text-xl font-medium text-on-surface">
                  {champion.kda}
                </span>
                <span className="text-xs text-on-surface-variant mt-1">
                  {champion.kdaDetail}
                </span>
              </div>

              {/* CS/min */}
              <div className="hidden sm:flex col-span-2 items-center justify-end pr-4">
                <span className="font-headline text-xl font-medium text-on-surface">
                  {champion.cspm}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

type Props = { rankedSolo: any };

export default function RankOverview({ rankedSolo }: Props) {
  const tier = rankedSolo?.tier ?? "UNRANKED";
  const rank = rankedSolo?.rank ?? "";
  const lp = rankedSolo?.leaguePoints ?? 0;
  const wins = rankedSolo?.wins ?? 0;
  const losses = rankedSolo?.losses ?? 0;
  const total = wins + losses;
  const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;
  const tierLabel =
    tier === "UNRANKED"
      ? "Unranked"
      : `${tier.charAt(0) + tier.slice(1).toLowerCase()} ${rank}`;
  const emblemUrl =
    tier !== "UNRANKED"
      ? `/assets/${tier.charAt(0) + tier.slice(1).toLowerCase()}.webp`
      : `/assets/unranked.webp`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 bg-surface-container-low rounded-xl p-8 flex items-center gap-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/5 rounded-full blur-[60px] pointer-events-none" />
        <img src={emblemUrl} alt={tier} className="w-24 h-24 object-contain shrink-0" />
        <div>
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-1">
            Current Rank
          </p>
          <h2 className="font-headline text-4xl font-bold text-on-surface mb-2">{tierLabel}</h2>
          <div className="flex items-baseline gap-2">
            <span className="font-headline text-5xl font-bold text-primary-container">{lp}</span>
            <span className="text-on-surface-variant font-label">LP</span>
          </div>
        </div>
      </div>
      <div className="bg-surface-container-low rounded-xl p-6 flex flex-col justify-between">
        <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-4">
          Season Record
        </p>
        <div className="flex gap-4 items-end mb-4">
          <span className="font-headline text-3xl font-bold text-primary-container">{wins}W</span>
          <span className="font-headline text-3xl font-bold text-tertiary-container">{losses}L</span>
        </div>
        <div className="h-1.5 rounded-full bg-surface-container-highest overflow-hidden mb-2">
          <div
            className="h-full bg-primary-container rounded-full transition-all"
            style={{ width: `${winRate}%` }}
          />
        </div>
        <p className="font-label text-sm text-on-surface-variant">{winRate}% win rate</p>
      </div>
    </div>
  );
}

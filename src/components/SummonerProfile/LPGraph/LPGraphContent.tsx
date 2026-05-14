import { useLPData } from "../../../hooks/useLPData";
import MomentumChart from "./MomentumChart";

type Props = {
  puuid: string;
  region: string;
  rankedSolo: any;
};

export default function LPGraphContent({ puuid, region, rankedSolo }: Props) {
  const { rankedMatches, isLoading } = useLPData(puuid, region);

  if (isLoading) return <p className="text-on-surface-variant font-label">Loading...</p>;

  const wins = rankedSolo?.wins ?? 0;
  const losses = rankedSolo?.losses ?? 0;
  const total = wins + losses;
  const winRate = total > 0 ? Math.round((wins / total) * 100) : 0;
  const tier = rankedSolo?.tier ?? "UNRANKED";
  const rank = rankedSolo?.rank ?? "";
  const lp = rankedSolo?.leaguePoints ?? 0;

  const avgDurationSec =
    rankedMatches.length > 0
      ? Math.round(rankedMatches.reduce((s, m) => s + m.gameDuration, 0) / rankedMatches.length)
      : 0;
  const avgDuration = `${Math.floor(avgDurationSec / 60)}m ${String(avgDurationSec % 60).padStart(2, "0")}s`;

  // Streak from most recent game (rankedMatches[0] = newest)
  let streak = 0;
  if (rankedMatches.length > 0) {
    const firstWin = rankedMatches[0].win;
    for (const m of rankedMatches) {
      if (m.win === firstWin) streak += firstWin ? 1 : -1;
      else break;
    }
  }

  const ordered = [...rankedMatches].reverse();

  const tierLabel =
    tier === "UNRANKED"
      ? "Unranked"
      : `${tier.charAt(0) + tier.slice(1).toLowerCase()} ${rank}`;

  const emblemUrl = tier !== "UNRANKED"
    ? `/assets/${tier.charAt(0) + tier.slice(1).toLowerCase()}.webp`
    : `/assets/unranked.webp`;

  return (
    <div className="space-y-6 pb-16 pt-6 sm:pt-0">
      {/* Header */}
      <div className="relative mb-12">
        <div className="absolute -top-10 -left-10 w-80 h-80 bg-primary-container/5 rounded-full blur-[100px] pointer-events-none" />
        <h1 className="font-headline text-5xl lg:text-6xl font-bold text-on-surface tracking-tighter mb-4 relative z-10">
          Performance <span className="text-on-surface-variant">Vector</span>
        </h1>
        <p className="font-body text-on-surface-variant text-lg leading-relaxed border-l-2 border-primary-container pl-4">
          Season 16 ranked progression — last {rankedMatches.length} games analyzed.
        </p>
      </div>

      {/* Rank Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Rank Card */}
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

        {/* W/L Card */}
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

      {/* Momentum Curve */}
      <div className="bg-surface-container-low rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-headline text-2xl font-bold text-on-surface">Momentum Curve</h2>
          <div className="flex gap-6 text-xs font-label text-on-surface-variant">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary-container inline-block" />
              Victory
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container inline-block" />
              Defeat
            </span>
          </div>
        </div>

        <MomentumChart matches={ordered} />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-surface-container-low rounded-xl p-6">
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-3">
            Avg Game Length
          </p>
          <p className="font-headline text-3xl font-bold text-on-surface">{avgDuration}</p>
        </div>
        <div className="bg-surface-container-low rounded-xl p-6">
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-3">
            {streak > 0 ? "Win Streak" : streak < 0 ? "Loss Streak" : "Streak"}
          </p>
          <p
            className={`font-headline text-3xl font-bold ${
              streak > 0
                ? "text-primary-container"
                : streak < 0
                ? "text-tertiary-container"
                : "text-on-surface"
            }`}
          >
            {Math.abs(streak)}
          </p>
        </div>
        <div className="bg-surface-container-low rounded-xl p-6">
          <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-3">
            Total Ranked Games
          </p>
          <p className="font-headline text-3xl font-bold text-on-surface">{total}</p>
        </div>
      </div>
    </div>
  );
}

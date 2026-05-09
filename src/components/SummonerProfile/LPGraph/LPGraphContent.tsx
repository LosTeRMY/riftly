import { useLPData } from "../../../hooks/useLPData";

function smoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const cpx = (pts[i - 1].x + pts[i].x) / 2;
    d += ` C ${cpx} ${pts[i - 1].y}, ${cpx} ${pts[i].y}, ${pts[i].x} ${pts[i].y}`;
  }
  return d;
}

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

  // Curve: oldest first
  const ordered = [...rankedMatches].reverse();
  let score = 0;
  const curveScores = ordered.map((m) => {
    score += m.win ? 1 : -1;
    return score;
  });

  const W = 800;
  const H = 200;
  const PAD = 24;
  const min = Math.min(...curveScores, 0);
  const max = Math.max(...curveScores, 0);
  const range = max - min || 1;

  const points = curveScores.map((s, i) => ({
    x: PAD + (i / Math.max(curveScores.length - 1, 1)) * (W - PAD * 2),
    y: PAD + (1 - (s - min) / range) * (H - PAD * 2),
  }));

  const linePath = smoothPath(points);
  const areaPath = linePath
    ? `${linePath} L ${points[points.length - 1].x} ${H} L ${points[0].x} ${H} Z`
    : "";

  const tierLabel =
    tier === "UNRANKED"
      ? "Unranked"
      : `${tier.charAt(0) + tier.slice(1).toLowerCase()} ${rank}`;

  const emblemUrl = tier !== "UNRANKED"
    ? `/assets/${tier.charAt(0) + tier.slice(1).toLowerCase()}.webp`
    : `/assets/unranked.webp`;

  return (
    <div className="space-y-6 pb-16">
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

        {ordered.length < 2 ? (
          <p className="text-on-surface-variant text-sm">
            Not enough ranked games to display the curve.
          </p>
        ) : (
          <>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="w-full"
              style={{ height: 200 }}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(0,255,148,0.2)" />
                  <stop offset="100%" stopColor="rgba(0,255,148,0)" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#curveGradient)" />
              <path
                d={linePath}
                fill="none"
                stroke="#00ff94"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {points.map((p, i) => (
                <circle
                  key={ordered[i].matchId}
                  cx={p.x}
                  cy={p.y}
                  r="5"
                  fill={ordered[i].win ? "#00ff94" : "#ffd5d2"}
                  stroke="#1b1b20"
                  strokeWidth="2"
                />
              ))}
            </svg>
            <div className="flex justify-between mt-3 text-xs font-label text-on-surface-variant">
              <span>{ordered.length} Games Ago</span>
              <span>{Math.round(ordered.length / 2)} Games Ago</span>
              <span>Current</span>
            </div>
          </>
        )}
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

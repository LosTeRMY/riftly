import type { Match } from "../../../types";

const POSITION_LABELS: Record<string, string> = {
  TOP: "Top",
  JUNGLE: "Jungle",
  MIDDLE: "Mid",
  BOTTOM: "Bot",
  UTILITY: "Support",
};

type Props = { matches: Match[]; isLoading: boolean };

export default function QuickStats({ matches, isLoading }: Props) {
  if (isLoading) return <div className="h-20" />;

  let streak = 0;
  if (matches.length > 0) {
    const firstWin = matches[0].win;
    for (const m of matches) {
      if (m.win === firstWin) streak += firstWin ? 1 : -1;
      else break;
    }
  }

  const roleCount: Record<string, number> = {};
  for (const m of matches) {
    if (m.position && m.position !== "INVALID") {
      roleCount[m.position] = (roleCount[m.position] ?? 0) + 1;
    }
  }
  const topRoleEntry = Object.entries(roleCount).sort((a, b) => b[1] - a[1])[0];
  const topRoleKey = topRoleEntry?.[0] ?? "—";
  const topRoleGames = topRoleEntry?.[1] ?? 0;
  const topRoleLabel = POSITION_LABELS[topRoleKey] ?? topRoleKey;
  const topRolePercent =
    matches.length > 0 ? Math.round((topRoleGames / matches.length) * 100) : 0;

  const totalKills = matches.reduce((s, m) => s + m.kills, 0);
  const totalDeaths = matches.reduce((s, m) => s + m.deaths, 0);
  const totalAssists = matches.reduce((s, m) => s + m.assists, 0);
  const kdaRatio =
    matches.length > 0
      ? totalDeaths === 0
        ? "Perfect"
        : ((totalKills + totalAssists) / totalDeaths).toFixed(2)
      : "—";
  const avgK = matches.length > 0 ? (totalKills / matches.length).toFixed(1) : "0.0";
  const avgD = matches.length > 0 ? (totalDeaths / matches.length).toFixed(1) : "0.0";
  const avgA = matches.length > 0 ? (totalAssists / matches.length).toFixed(1) : "0.0";

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-surface-container-low rounded-xl p-6">
        <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-3">
          {streak > 0 ? "Win Streak" : streak < 0 ? "Loss Streak" : "Streak"}
        </p>
        <p
          className={`font-headline text-4xl font-bold ${
            streak > 0
              ? "text-primary-container"
              : streak < 0
              ? "text-tertiary-container"
              : "text-on-surface"
          }`}
        >
          {Math.abs(streak)}
        </p>
        <p className="font-label text-xs text-on-surface-variant mt-2">recent games</p>
      </div>
      <div className="bg-surface-container-low rounded-xl p-6">
        <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-3">
          Primary Role
        </p>
        <p className="font-headline text-4xl font-bold text-on-surface">{topRoleLabel}</p>
        <p className="font-label text-xs text-on-surface-variant mt-2">
          {topRolePercent > 0 ? `${topRolePercent}% of games` : "no data"}
        </p>
      </div>
      <div className="bg-surface-container-low rounded-xl p-6">
        <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-3">
          Avg KDA
        </p>
        <p className="font-headline text-3xl font-bold text-on-surface">
          {kdaRatio}
          {kdaRatio !== "Perfect" && kdaRatio !== "—" && (
            <span className="text-on-surface-variant text-lg">:1</span>
          )}
        </p>
        <p className="font-label text-xs text-on-surface-variant mt-2">
          {avgK} / {avgD} / {avgA}
        </p>
      </div>
    </div>
  );
}

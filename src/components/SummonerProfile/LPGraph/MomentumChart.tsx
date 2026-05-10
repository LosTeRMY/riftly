type Match = { matchId: string; win: boolean };

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
  matches: Match[]; // oldest first
  height?: number;
  showLabels?: boolean;
};

export default function MomentumChart({ matches, height = 200, showLabels = true }: Props) {
  if (matches.length < 2) {
    return <p className="text-on-surface-variant text-sm">Not enough ranked games to display the curve.</p>;
  }

  const W = 800;
  const H = height;
  const PAD = 24;

  let score = 0;
  const curveScores = matches.map((m) => {
    score += m.win ? 1 : -1;
    return score;
  });

  const min = Math.min(...curveScores, 0);
  const max = Math.max(...curveScores, 0);
  const range = max - min || 1;

  const points = curveScores.map((s, i) => ({
    x: PAD + (i / Math.max(curveScores.length - 1, 1)) * (W - PAD * 2),
    y: PAD + (1 - (s - min) / range) * (H - PAD * 2),
  }));

  const linePath = smoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${H} L ${points[0].x} ${H} Z`;

  return (
    <>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ height }}
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
            key={matches[i].matchId}
            cx={p.x}
            cy={p.y}
            r="5"
            fill={matches[i].win ? "#00ff94" : "#ffd5d2"}
            stroke="#1b1b20"
            strokeWidth="2"
          />
        ))}
      </svg>
      {showLabels && (
        <div className="flex justify-between mt-3 text-xs font-label text-on-surface-variant">
          <span>{matches.length} Games Ago</span>
          <span>{Math.round(matches.length / 2)} Games Ago</span>
          <span>Current</span>
        </div>
      )}
    </>
  );
}

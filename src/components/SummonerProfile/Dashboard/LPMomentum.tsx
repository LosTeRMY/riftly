import MomentumChart from "../LPGraph/MomentumChart";

type Props = {
  matches: { matchId: string; win: boolean }[];
  isLoading: boolean;
  onNavigate: () => void;
};

export default function LPMomentum({ matches, isLoading, onNavigate }: Props) {
  return (
    <div className="bg-surface-container-low rounded-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-headline text-2xl font-bold text-on-surface">LP Momentum</h2>
        <button
          onClick={onNavigate}
          className="flex items-center gap-1.5 text-xs font-label text-on-surface-variant hover:text-primary-container transition-colors"
        >
          Full graph
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
      {isLoading ? (
        <div className="h-36" />
      ) : matches.length >= 2 ? (
        <MomentumChart matches={matches} height={140} showLabels={false} />
      ) : (
        <p className="text-on-surface-variant text-sm font-label">
          Not enough ranked games to display.
        </p>
      )}
    </div>
  );
}

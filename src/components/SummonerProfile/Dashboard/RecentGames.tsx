import type { Match } from "../../../types";

type Props = {
  matches: Match[];
  isLoading: boolean;
  onNavigate: () => void;
};

export default function RecentGames({ matches, isLoading, onNavigate }: Props) {
  return (
    <div className="bg-surface-container-low rounded-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-headline text-2xl font-bold text-on-surface">Recent Games</h2>
        <button
          onClick={onNavigate}
          className="flex items-center gap-1.5 text-xs font-label text-on-surface-variant hover:text-primary-container transition-colors"
        >
          See all
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
      {isLoading ? (
        <div className="h-20" />
      ) : (
        <div className="flex flex-col gap-2">
          {matches.slice(0, 5).map((match) => (
            <div
              key={match.matchId}
              className="relative flex items-center gap-4 px-4 py-3 rounded-xl bg-surface-container overflow-hidden"
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 ${
                  match.win ? "bg-primary-container" : "bg-tertiary-container"
                }`}
              />
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/16.8.1/img/champion/${match.champion.replace("'", "")}.png`}
                alt={match.champion}
                className="w-10 h-10 rounded-lg object-cover ml-2"
              />
              <div className="flex-1 min-w-0">
                <p className="font-headline text-sm font-bold text-on-surface">{match.champion}</p>
                <p className="font-label text-xs text-on-surface-variant">{match.queue}</p>
              </div>
              <div className="text-center">
                <p className="font-headline text-sm text-on-surface">
                  {match.kills}/{match.deaths}/{match.assists}
                </p>
                <p className="font-label text-xs text-on-surface-variant">{match.duration}</p>
              </div>
              <div className="w-14 text-right">
                <p
                  className={`font-label text-xs font-bold ${
                    match.win ? "text-primary-container" : "text-tertiary-container"
                  }`}
                >
                  {match.win ? "WIN" : "LOSS"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import type { ChampionSummary } from "../../../hooks/useChampionStats";

type Props = {
  champions: ChampionSummary[];
  isLoading: boolean;
  onNavigate: () => void;
};

export default function TopChampions({ champions, isLoading, onNavigate }: Props) {
  return (
    <div className="bg-surface-container-low rounded-xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-headline text-2xl font-bold text-on-surface">Top Champions</h2>
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
        <div className="flex flex-col gap-3">
          {champions.slice(0, 3).map((champ, i) => (
            <div
              key={champ.name}
              className="flex items-center gap-4 px-4 py-3 rounded-xl bg-surface-container"
            >
              <span className="font-label text-xs text-on-surface-variant w-4">{i + 1}</span>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/16.8.1/img/champion/${champ.name.replace("'", "")}.png`}
                alt={champ.name}
                className="w-10 h-10 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-headline text-sm font-bold text-on-surface">{champ.name}</p>
                <p className="font-label text-xs text-on-surface-variant">{champ.games} games</p>
              </div>
              <div className="text-right">
                <p
                  className={`font-headline text-sm font-bold ${
                    champ.winRate >= 50 ? "text-primary-container" : "text-tertiary-container"
                  }`}
                >
                  {champ.winRate}%
                </p>
                <p className="font-label text-xs text-on-surface-variant">{champ.kda}:1</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

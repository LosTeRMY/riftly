import type { Match } from "../../types"

function calcKDA(kills: number, deaths: number, assists: number) {
  if (deaths === 0) return "Perfect";
  return ((kills + assists) / deaths).toFixed(2);
}

export default function MatchCard({ match }: { match: Match }) {
  return (
    <div
      className="bg-surface-container rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 relative overflow-hidden hover:bg-[#25252d] transition-colors group shadow-match"
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 ${match.win ? "bg-primary-container" : "bg-tertiary-container"}`}
      />

      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container-highest group-hover:scale-105 transition-transform shrink-0">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/16.8.1/img/champion/${match.champion}.png`}
            alt={match.champion}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 md:w-32 min-w-0">
          <div className="font-headline font-bold text-lg text-white truncate">
            {match.champion}
          </div>
          <div className="font-label text-sm text-on-surface-variant truncate">
            {match.queue}
          </div>
        </div>
        {/* Victory/Defeat shown inline on mobile only */}
        <div className="md:hidden text-right shrink-0">
          <div className={`font-headline font-bold text-sm ${match.win ? "text-primary-fixed-dim" : "text-tertiary-fixed-dim"}`}>
            {match.win ? "Victory" : "Defeat"}
          </div>
          <div className="font-label text-xs text-on-surface-variant">{match.duration}</div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-3 gap-4 items-center w-full">
        <div className="text-center">
          <div className="font-headline text-xl font-bold text-white">
            {match.kills} / {match.deaths} / {match.assists}
          </div>
          <div className="font-label text-xs text-on-surface-variant uppercase tracking-wider mt-1">
            {calcKDA(match.kills, match.deaths, match.assists)} KDA
          </div>
        </div>
        <div className="text-center">
          <div className="font-headline text-lg text-white">{match.cs}</div>
          <div className="font-label text-xs text-on-surface-variant uppercase tracking-wider mt-1">
            CS ({match.cspm}/m)
          </div>
        </div>
        <div className="flex justify-end items-center">
          <div className="hidden sm:flex gap-1">
            {match.items.map((itemId, i) => (
              <div
                key={i}
                className="w-8 h-8 bg-surface-container-highest rounded-lg overflow-hidden"
              >
                {itemId !== 0 && (
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/16.8.1/img/item/${itemId}.png`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden md:block text-right w-24 flex-shrink-0">
        <div
          className={`font-headline font-bold ${match.win ? "text-primary-fixed-dim" : "text-tertiary-fixed-dim"}`}
        >
          {match.win ? "Victory" : "Defeat"}
        </div>
        <div className="font-label text-sm text-on-surface-variant">
          {match.duration}
        </div>
      </div>
    </div>
  );
}

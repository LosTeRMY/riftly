import { useQuery, useQueries } from "@tanstack/react-query";
import { getMatchIds, getMatch } from "../api/riot";

type ChampionStat = {
  name: string;
  games: number;
  wins: number;
  kills: number;
  deaths: number;
  assists: number;
  cs: number;
  gameDurationMinutes: number;
};

export type ChampionSummary = {
  name: string;
  games: number;
  winRate: number;
  kda: string;
  kdaDetail: string;
  cspm: string;
};

// Limited to 50 matches due to Riot API rate limits on dev keys

export function useChampionStats(puuid: string, region: string) {
  // Step 1: fetch the last 50 match IDs
  const { data: matchIds = [], isLoading: idsLoading } = useQuery({
    queryKey: ["matchIds", puuid, "champions", 50],
    queryFn: () => getMatchIds(puuid, region, 50, 0),
    enabled: !!puuid,
  });

  // Step 2: fetch each match detail in parallel
  const matchQueries = useQueries({
    queries: matchIds.map((matchId: string) => ({
      queryKey: ["match", matchId],
      queryFn: () => getMatch(matchId, region),
    })),
  });

  const isLoading = idsLoading || matchQueries.some((q) => q.isLoading);

  // Step 3: aggregate stats per champion (kills, wins, cs...) into an object keyed by name
  const championMap = matchQueries
    .filter((q) => !!q.data)
    .reduce((acc: Record<string, ChampionStat>, q) => {
      const { info } = q.data as any;
      const p = info.participants.find((p: any) => p.puuid === puuid);
      const durationMinutes = info.gameDuration / 60;

      if (!acc[p.championName]) {
        acc[p.championName] = {
          name: p.championName,
          games: 0, wins: 0, kills: 0, deaths: 0, assists: 0, cs: 0, gameDurationMinutes: 0,
        };
      }

      acc[p.championName].games += 1;
      acc[p.championName].wins += p.win ? 1 : 0;
      acc[p.championName].kills += p.kills;
      acc[p.championName].deaths += p.deaths;
      acc[p.championName].assists += p.assists;
      acc[p.championName].cs += p.totalMinionsKilled + p.neutralMinionsKilled;
      acc[p.championName].gameDurationMinutes += durationMinutes;

      return acc;
    }, {});

  // Step 4: compute averages and format for display, sorted by game count
  const champions: ChampionSummary[] = Object.values(championMap)
    .sort((a, b) => b.games - a.games)
    .map((c) => {
      const avgKills = (c.kills / c.games).toFixed(1);
      const avgDeaths = (c.deaths / c.games).toFixed(1);
      const avgAssists = (c.assists / c.games).toFixed(1);
      const kda = c.deaths === 0
        ? "Perfect"
        : ((c.kills + c.assists) / c.deaths).toFixed(2);
      const cspm = (c.cs / c.gameDurationMinutes).toFixed(1);
      const winRate = Math.round((c.wins / c.games) * 100);

      return {
        name: c.name,
        games: c.games,
        winRate,
        kda,
        kdaDetail: `${avgKills} / ${avgDeaths} / ${avgAssists}`,
        cspm,
      };
    });

  return { champions, isLoading };
}

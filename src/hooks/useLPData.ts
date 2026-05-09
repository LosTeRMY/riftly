import { useQuery, useQueries } from "@tanstack/react-query";
import { getMatchIds, getMatch } from "../api/riot";

export type LPMatch = {
  matchId: string;
  win: boolean;
  gameDuration: number;
};

export function useLPData(puuid: string, region: string) {
  const { data: matchIds = [] } = useQuery({
    queryKey: ["matchIds", puuid, "lp", 20],
    queryFn: () => getMatchIds(puuid, region, 20, 0),
    enabled: !!puuid,
  });

  const matchQueries = useQueries({
    queries: matchIds.map((id: string) => ({
      queryKey: ["match", id],
      queryFn: () => getMatch(id, region),
    })),
  });

  const isLoading = matchIds.length === 0 || matchQueries.some((q) => q.isLoading);

  type RawMatch = LPMatch & { queueId: number };

  const rankedMatches: LPMatch[] = matchQueries
    .filter((q) => !!q.data)
    .map((q): RawMatch => {
      const { info, metadata } = q.data as any;
      const p = info.participants.find((p: any) => p.puuid === puuid);
      return {
        matchId: metadata.matchId,
        win: p.win,
        queueId: info.queueId,
        gameDuration: info.gameDuration,
      };
    })
    .filter((m) => m.queueId === 420)
    .map(({ matchId, win, gameDuration }) => ({ matchId, win, gameDuration }));

  return { rankedMatches, isLoading };
}

import { useState, useEffect } from "react";
import { useQueries } from "@tanstack/react-query";
import { getMatchIds, getMatch } from "../api/riot";
import type { Match } from "../types";

const QUEUE_LABELS: Record<number, string> = {
  420: "Ranked Solo",
  440: "Ranked Flex",
  430: "Normal Blind",
  400: "Normal Draft",
  450: "ARAM",
};

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function useMatchHistory(puuid: string, region: string) {
  const [matchIds, setMatchIds] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getMatchIds(puuid, region, 10, 0).then((ids) => {
      setMatchIds(ids);
      if (ids.length < 10) setHasMore(false);
    });
  }, [puuid, region]);

  const matchQueries = useQueries({
    queries: matchIds.map((matchId: string) => ({
      queryKey: ["match", matchId],
      queryFn: () => getMatch(matchId, region),
    })),
  });

  const matches: Match[] = matchQueries
    .filter((q) => !!q.data)
    .map((q) => {
      const { info, metadata } = q.data as any;
      const p = info.participants.find((p: any) => p.puuid === puuid);
      const totalCs = p.totalMinionsKilled + p.neutralMinionsKilled;
      const cspm = (totalCs / (info.gameDuration / 60)).toFixed(1);
      return {
        matchId: metadata.matchId,
        champion: p.championName,
        position: p.individualPosition,
        kills: p.kills,
        deaths: p.deaths,
        assists: p.assists,
        cs: totalCs,
        cspm,
        win: p.win,
        duration: formatDuration(info.gameDuration),
        queue: QUEUE_LABELS[info.queueId] ?? "Classic",
        items: [p.item0, p.item1, p.item2, p.item3, p.item4, p.item5],
      };
    });

  const isLoading = matchQueries.some((q) => q.isLoading);

  async function loadMore() {
    const newIds = await getMatchIds(puuid, region, 10, matchIds.length);
    setMatchIds((prev) => [...prev, ...newIds]);
    if (newIds.length < 10) setHasMore(false);
  }

  return { matches, hasMore, loadMore, isLoading };
}

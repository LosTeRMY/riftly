import { useParams } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import ProfileHeader from "./ProfileHeader";
import MatchHistory from "./MatchHistory";
import SummonerNotFound from "../SummonerNotFound";
import { useQuery } from "@tanstack/react-query";
import { getPUUID, getSummoner, getRank } from "../../api/riot";


export default function SummonerProfile() {
  const { region, name } = useParams();

  const [gameName, tagLine] = decodeURIComponent(name ?? "").split("#");

  const {
    data: account,
    isPending: accountPending,
    error: accountError,
  } = useQuery({
    queryKey: ["account", gameName, tagLine],
    queryFn: () => getPUUID(gameName, tagLine),
    enabled: !!name && !!region,
    retry: false,
  });

  const { data: summoner, isLoading: summonerLoading } = useQuery({
    queryKey: ["summoner", account?.puuid],
    queryFn: () => getSummoner(account!.puuid, region!),
    enabled: !!account?.puuid,
  });

  const { data: rankData } = useQuery({
  queryKey: ['rank', account?.puuid],
  queryFn: () => getRank(account!.puuid, region!),
  enabled: !!account?.puuid,
});

const soloRank = rankData?.find((entry: any) => entry.queueType === 'RANKED_SOLO_5x5');

  if (!name || !region) return null;
  if (accountError) return <SummonerNotFound />;
  if (accountPending || summonerLoading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background text-on-surface pt-16">
      {/* Sidebar */}
      <ProfileSidebar gameName={account.gameName} tagLine={account.tagLine} region={region} profileIconId={summoner?.profileIconId} />

      {/* Main content */}
      <main className="flex-1 lg:ml-64 p-4 sm:p-6 md:p-12 lg:p-16 max-w-400 w-full">
        {/* Summoner header */}
        <ProfileHeader
          gameName={account.gameName}
          tagLine={account.tagLine}
          region={region}
          level={summoner?.summonerLevel}
          profileIconId={summoner?.profileIconId}
          soloRank={soloRank}
        />

        {/* Match History */}
        <MatchHistory
        puuid={account.puuid}
        region={region}
        />
      </main>
    </div>
  );
}

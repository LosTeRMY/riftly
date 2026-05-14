import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPUUID, getSummoner, getRank } from "../../../api/riot";
import ProfileSidebar from "../ProfileSidebar";
import DashboardContent from "./DashboardContent";

export default function DashboardPage() {
  const { region, name } = useParams();
  const [gameName, tagLine] = decodeURIComponent(name ?? "").split("#");

  const { data: account, isLoading: accountLoading, error: accountError } = useQuery({
    queryKey: ["account", gameName, tagLine],
    queryFn: () => getPUUID(gameName, tagLine),
    enabled: !!name && !!region,
  });

  const { data: summoner, isLoading: summonerLoading } = useQuery({
    queryKey: ["summoner", account?.puuid],
    queryFn: () => getSummoner(account!.puuid, region!),
    enabled: !!account?.puuid,
  });

  const { data: rankData, isLoading: rankLoading } = useQuery({
    queryKey: ["rank", account?.puuid],
    queryFn: () => getRank(account!.puuid, region!),
    enabled: !!account?.puuid,
  });

  if (!name || !region) return null;
  if (accountLoading || summonerLoading || rankLoading) return <div>Loading...</div>;
  if (accountError) return <div>Summoner not found</div>;

  const rankedSolo = rankData?.find((r: any) => r.queueType === "RANKED_SOLO_5x5");

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background text-on-surface pt-16">
      <ProfileSidebar
        gameName={account.gameName}
        tagLine={account.tagLine}
        region={region}
        profileIconId={summoner?.profileIconId}
      />
      <main className="flex-1 lg:ml-64 px-4 pt-4 pb-24 sm:px-6 sm:pt-6 md:px-12 md:pt-12 lg:px-16 lg:pt-16 max-w-400 w-full">
        <DashboardContent puuid={account.puuid} region={region} rankedSolo={rankedSolo} />
      </main>
    </div>
  );
}

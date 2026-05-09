import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ChampionList from "./ChampionsList";
import ProfileSidebar from "../ProfileSidebar";
import { getPUUID, getSummoner } from "../../../api/riot";



export default function ChampionsPage() {
  const { region, name } = useParams();

  const [gameName, tagLine] = decodeURIComponent(name ?? "").split("#");

  const {
    data: account,
    isLoading: accountLoading,
    error: accountError,
  } = useQuery({
    queryKey: ["account", gameName, tagLine],
    queryFn: () => getPUUID(gameName, tagLine),
    enabled: !!name && !!region,
  });

  const { data: summoner, isLoading: summonerLoading } = useQuery({
    queryKey: ["summoner", account?.puuid],
    queryFn: () => getSummoner(account!.puuid, region!),
    enabled: !!account?.puuid,
  });


  if (!name || !region) return null;
  if (accountLoading || summonerLoading) return <div>Loading...</div>;
  if (accountError) return <div>Summoner not found</div>;

  return (
    <div className="min-h-screen flex bg-background text-on-surface pt-16">
      {/* Sidebar */}
      <ProfileSidebar gameName={account.gameName} tagLine={account.tagLine} region={region} profileIconId={summoner?.profileIconId} />

      {/* Main content */}
      <main className="flex-1 md:ml-64 p-6 md:p-12 lg:p-16 max-w-400 w-full">
        {/* Champions */}
        <ChampionList puuid={account.puuid} region={region} />
      </main>
    </div>
  );
}
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPUUID, getSummoner } from "../../../api/riot";
import ProfileSidebar from "../ProfileSidebar";
import SettingsContent from "./SettingsContent";

export default function SettingsPage() {
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

  if (!name || !region) return null;
  if (accountLoading || summonerLoading) return <div>Loading...</div>;
  if (accountError) return <div>Summoner not found</div>;

  return (
    <div className="min-h-screen flex bg-background text-on-surface pt-16">
      <ProfileSidebar
        gameName={account.gameName}
        tagLine={account.tagLine}
        region={region}
        profileIconId={summoner?.profileIconId}
      />
      <main className="flex-1 md:ml-64 px-6 pt-6 pb-24 md:px-12 md:pt-12 lg:px-16 lg:pt-16 max-w-400 w-full">
        <SettingsContent
          currentGameName={account.gameName}
          currentTagLine={account.tagLine}
          currentRegion={region}
        />
      </main>
    </div>
  );
}

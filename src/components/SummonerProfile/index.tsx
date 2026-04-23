import { useParams } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import ProfileHeader from "./ProfileHeader";
import MatchHistory from "./MatchHistory";

export default function SummonerProfile() {
  const { region, name } = useParams();

  if (!name || !region) return null;

  return (
    <div className="min-h-screen flex bg-background text-on-surface pt-16">
      {/* Sidebar */}
      <ProfileSidebar name={name} region={region} />

      {/* Main content */}
      <main className="flex-1 md:ml-64 p-6 md:p-12 lg:p-16 max-w-400 w-full">
        {/* Summoner header */}
        <ProfileHeader name={name} region={region} />

        {/* Match History */}
        <MatchHistory />
      </main>
    </div>
  );
}

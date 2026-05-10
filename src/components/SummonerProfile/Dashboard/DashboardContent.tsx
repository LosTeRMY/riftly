import { useParams, useNavigate } from "react-router-dom";
import { useMatchHistory } from "../../../hooks/useMatchHistory";
import { useChampionStats } from "../../../hooks/useChampionStats";
import { useLPData } from "../../../hooks/useLPData";
import RankOverview from "./RankOverview";
import QuickStats from "./QuickStats";
import TopChampions from "./TopChampions";
import RecentGames from "./RecentGames";
import LPMomentum from "./LPMomentum";

type Props = { puuid: string; region: string; rankedSolo: any };

export default function DashboardContent({ puuid, region, rankedSolo }: Props) {
  const { name } = useParams();
  const navigate = useNavigate();
  const { matches, isLoading: matchLoading } = useMatchHistory(puuid, region);
  const { champions, isLoading: champLoading } = useChampionStats(puuid, region);
  const { rankedMatches, isLoading: lpLoading } = useLPData(puuid, region);

  const base = `/summoner/${region}/${name}`;
  const orderedLP = [...rankedMatches].reverse();

  return (
    <div className="space-y-6 pb-16">
      <div className="relative mb-12">
        <div className="absolute -top-10 -left-10 w-80 h-80 bg-primary-container/5 rounded-full blur-[100px] pointer-events-none" />
        <h1 className="font-headline text-5xl lg:text-6xl font-bold text-on-surface tracking-tighter mb-4 relative z-10">
          Performance <span className="text-on-surface-variant">Overview</span>
        </h1>
        <p className="font-body text-on-surface-variant text-lg leading-relaxed border-l-2 border-primary-container pl-4">
          Snapshot of Season 16 ranked activity.
        </p>
      </div>

      <RankOverview rankedSolo={rankedSolo} />
      <QuickStats matches={matches} isLoading={matchLoading} />
      <TopChampions
        champions={champions}
        isLoading={champLoading}
        onNavigate={() => navigate(`${base}/champions`)}
      />
      <RecentGames
        matches={matches}
        isLoading={matchLoading}
        onNavigate={() => navigate(base)}
      />
      <LPMomentum
        matches={orderedLP}
        isLoading={lpLoading}
        onNavigate={() => navigate(`${base}/lp-graph`)}
      />
    </div>
  );
}

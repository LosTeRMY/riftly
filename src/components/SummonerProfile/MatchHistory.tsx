import { useState } from "react";
import MatchCard from "./MatchCard";
import { useMatchHistory } from "../../hooks/useMatchHistory";

const ROLES = ["ALL", "TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"];

export default function MatchHistory({
  puuid,
  region,
}: {
  puuid: string;
  region: string;
}) {
  const [selectedRole, setSelectedRole] = useState("ALL");
  const { matches, hasMore, loadMore, isLoading } = useMatchHistory(puuid, region);

  const filtered = selectedRole === "ALL"
    ? matches
    : matches.filter((m) => m.position === selectedRole);

  return (
    <section>
      <div className="flex justify-between items-end mb-8">
        <h2 className="hidden sm:block font-headline text-2xl font-bold text-white">
          Recent Matches
        </h2>
        <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:pb-0">
          {ROLES.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded-lg font-label text-sm transition-colors ${
                selectedRole === role
                  ? "bg-primary-container text-on-primary"
                  : "bg-surface-container-highest text-on-surface hover:bg-surface-bright"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {isLoading && filtered.length === 0 ? (
          <p className="text-on-surface-variant font-label">Loading matches...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center py-8">No recent games found for this role.</p>
        ) : (
          filtered.map((match) => (
            <MatchCard key={match.matchId} match={match} />
          ))
        )}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={loadMore}
            className="px-8 py-3 rounded-lg border border-outline-variant/50 text-on-surface hover:bg-surface-container-low transition-colors font-headline font-semibold mb-14"
          >
            Load More Matches
          </button>
        </div>
      )}
    </section>
  );
}

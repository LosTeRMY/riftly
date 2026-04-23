const MATCHES = [
  {
    champion: "Ashe",
    type: "Ranked Solo",
    kda: "12 / 2 / 8",
    kdaValue: "10.0 KDA",
    cs: "184",
    csRate: "CS (7.6/m)",
    victory: true,
    duration: "24:12",
  },
  {
    champion: "Aatrox",
    type: "Ranked Solo",
    kda: "4 / 7 / 3",
    kdaValue: "1.0 KDA",
    cs: "210",
    csRate: "CS (6.4/m)",
    victory: false,
    duration: "32:45",
  },
  {
    champion: "Ahri",
    type: "Ranked Solo",
    kda: "9 / 1 / 14",
    kdaValue: "23.0 KDA",
    cs: "245",
    csRate: "CS (8.7/m)",
    victory: true,
    duration: "28:10",
  },
];

export default function MatchHistory() {
  return (
    <section>
      <div className="flex justify-between items-end mb-8">
        <h2 className="font-headline text-2xl font-bold text-white">
          Recent Matches
        </h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-surface-container-highest text-on-surface rounded-lg font-label text-sm hover:bg-surface-bright transition-colors">
            All Roles
          </button>
          <button className="px-4 py-2 bg-surface-container-highest text-on-surface rounded-lg font-label text-sm hover:bg-surface-bright transition-colors">
            Ranked Solo
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {MATCHES.map((match) => (
          <div
            key={match.champion}
            className="bg-surface-container rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 relative overflow-hidden hover:bg-[#25252d] transition-colors group shadow-match"
          >
            <div
              className={`absolute left-0 top-0 bottom-0 w-1 ${match.victory ? "bg-primary-container" : "bg-tertiary-container"}`}
            />

            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="w-12 h-12 rounded-xl bg-surface-container-highest group-hover:scale-105 transition-transform" />
              <div className="flex-1 md:w-32">
                <div className="font-headline font-bold text-lg text-white">
                  {match.champion}
                </div>
                <div className="font-label text-sm text-on-surface-variant">
                  {match.type}
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-3 gap-4 items-center w-full">
              <div className="text-center">
                <div className="font-headline text-xl font-bold text-white">
                  {match.kda}
                </div>
                <div className="font-label text-xs text-on-surface-variant uppercase tracking-wider mt-1">
                  {match.kdaValue}
                </div>
              </div>
              <div className="text-center">
                <div className="font-headline text-lg text-white">
                  {match.cs}
                </div>
                <div className="font-label text-xs text-on-surface-variant uppercase tracking-wider mt-1">
                  {match.csRate}
                </div>
              </div>
              <div className="flex justify-end items-center gap-2">
                <div className="hidden sm:flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-surface-container-highest rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden md:block text-right w-24">
              <div
                className={`font-headline font-bold ${match.victory ? "text-primary-fixed-dim" : "text-tertiary-fixed-dim"}`}
              >
                {match.victory ? "Victory" : "Defeat"}
              </div>
              <div className="font-label text-sm text-on-surface-variant">
                {match.duration}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button className="px-8 py-3 rounded-lg border border-outline-variant/50 text-on-surface hover:bg-surface-container-low transition-colors font-headline font-semibold">
          Load More Matches
        </button>
      </div>
    </section>
  );
}

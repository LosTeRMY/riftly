import { useState } from "react";
import { useNavigate } from "react-router-dom";

type SavedSummoner = {
  gameName: string;
  tagLine: string;
  region: string;
};

const REGIONS = [
  { value: "EUW", label: "Europe West" },
  { value: "NA", label: "North America" },
  { value: "EUNE", label: "Europe Nordic & East" },
  { value: "KR", label: "Korea" },
];

const TECH_STACK = ["React", "TypeScript", "TanStack Query", "Tailwind CSS", "Riot Games API"];

type Props = {
  currentGameName: string;
  currentTagLine: string;
  currentRegion: string;
};

export default function SettingsContent({ currentGameName, currentTagLine, currentRegion }: Props) {
  const navigate = useNavigate();

  const [defaultRegion, setDefaultRegion] = useState(
    localStorage.getItem("defaultRegion") ?? "EUW"
  );
  const [savedSummoners, setSavedSummoners] = useState<SavedSummoner[]>(
    JSON.parse(localStorage.getItem("savedSummoners") ?? "[]")
  );

  function handleRegionChange(value: string) {
    setDefaultRegion(value);
    localStorage.setItem("defaultRegion", value);
  }

  function bookmarkCurrent() {
    const already = savedSummoners.some(
      (s) => s.gameName === currentGameName && s.tagLine === currentTagLine
    );
    if (already) return;
    const updated = [{ gameName: currentGameName, tagLine: currentTagLine, region: currentRegion }, ...savedSummoners];
    setSavedSummoners(updated);
    localStorage.setItem("savedSummoners", JSON.stringify(updated));
  }

  function removeSummoner(index: number) {
    const updated = savedSummoners.filter((_, i) => i !== index);
    setSavedSummoners(updated);
    localStorage.setItem("savedSummoners", JSON.stringify(updated));
  }

  return (
    <div className="space-y-8 pb-16">

      {/* Header */}
      <div className="relative mb-12">
        <div className="absolute -top-10 -left-10 w-80 h-80 bg-primary-container/5 rounded-full blur-[100px] pointer-events-none" />
        <h1 className="font-headline text-5xl lg:text-6xl font-bold text-on-surface tracking-tighter mb-4 relative z-10">
          Control <span className="text-on-surface-variant">Center</span>
        </h1>
        <p className="font-body text-on-surface-variant text-lg leading-relaxed border-l-2 border-primary-container pl-4">
          Manage your Riftly experience.
        </p>
      </div>

      {/* Preferences */}
      <div className="bg-surface-container-low rounded-xl p-8 flex items-center justify-between gap-8">
        <div>
          <h2 className="font-headline text-2xl font-bold text-on-surface mb-1">Preferences</h2>
          <p className="font-body text-on-surface-variant text-sm">
            Your selected region will be used as the default for all search queries.
          </p>
        </div>
        <div className="shrink-0">
          <label className="block mb-2 text-xs font-label uppercase tracking-widest text-on-surface-variant">
            Default Region
          </label>
          <select
            value={defaultRegion}
            onChange={(e) => handleRegionChange(e.target.value)}
            className="bg-surface-container text-on-surface font-body text-sm rounded-lg px-4 py-3 outline-none border border-outline-variant/20 focus:border-primary-container transition-colors cursor-pointer"
          >
            {REGIONS.map((r) => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bookmarked Summoners */}
      <div className="bg-surface-container-low rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-1">
              Bookmarked Summoners
            </h2>
            <p className="font-body text-on-surface-variant text-sm">
              Quick access to saved profiles.
            </p>
          </div>
          <button
            onClick={bookmarkCurrent}
            className="flex items-center gap-2 px-4 py-2 bg-surface-container hover:bg-surface-container-high text-primary-container font-label text-sm font-bold rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-base">bookmark_add</span>
            Save current
          </button>
        </div>

        {savedSummoners.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3 text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl">person_add</span>
            <p className="font-body text-sm">No saved summoners yet.</p>
            <p className="font-body text-xs opacity-60">Click "Save current" to bookmark this profile.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-12 px-4 py-2 text-xs font-headline font-bold text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/10">
              <div className="col-span-7">Summoner</div>
              <div className="col-span-3">Region</div>
              <div className="col-span-2 text-right">Action</div>
            </div>
            {savedSummoners.map((s, i) => (
              <div
                key={i}
                className="grid grid-cols-12 px-4 py-3 rounded-lg bg-surface-container items-center hover:bg-surface-container-high transition-colors group"
              >
                <div className="col-span-7 flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant text-base">person</span>
                  <button
                    onClick={() => navigate(`/summoner/${s.region}/${encodeURIComponent(s.gameName + "#" + s.tagLine)}`)}
                    className="font-headline font-bold text-on-surface hover:text-primary-container transition-colors text-sm"
                  >
                    {s.gameName}
                    <span className="text-on-surface-variant font-normal">#{s.tagLine}</span>
                  </button>
                </div>
                <div className="col-span-3">
                  <span className="text-xs font-label bg-surface-container-highest px-2 py-1 rounded-md text-on-surface-variant">
                    {s.region}
                  </span>
                </div>
                <div className="col-span-2 flex justify-end">
                  <button
                    onClick={() => removeSummoner(i)}
                    className="text-on-surface-variant hover:text-tertiary-container transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* About */}
      <div className="bg-surface-container-low rounded-xl p-8 grid grid-cols-2 gap-12">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-2">About Riftly</h2>
            <p className="font-body text-on-surface-variant text-sm leading-relaxed">
              Portfolio project built to explore React, TypeScript and the Riot Games API.
              Stats are based on last 50 games due to the dev API key rate limits.
            </p>
          </div>
          <div className="flex gap-3 mt-6">
            <a
              href="https://github.com/LosTeRMY/riftly"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface font-label text-sm font-bold rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-base">code</span>
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/thibaud-tranchet-b6b91134a/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-primary-container hover:bg-primary-fixed-dim text-on-primary font-label text-sm font-bold rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-base">open_in_new</span>
              LinkedIn
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-start pt-3 pl-2 sm:pt-0 sm:pl-0 sm:justify-center">
          <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-3">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="text-xs font-label bg-surface-container-highest text-on-surface-variant px-3 py-1.5 rounded-lg"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

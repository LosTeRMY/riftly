const API_KEY = import.meta.env.VITE_RIOT_API_KEY;

const REGION_HOSTS: Record<string, string> = {
  EUW: "euw1",
  NA: "na1",
  EUNE: "eun1",
  KR: "kr",
};

const MATCH_REGION_HOSTS: Record<string, string> = {
  EUW: 'europe',
  EUNE: 'europe',
  NA: 'americas',
  KR: 'asia',
};

// Account info
export async function getPUUID(gameName: string, tagLine: string) {
  const res = await fetch(
    `https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
    { headers: { "X-Riot-Token": API_KEY } },
  );

  if (!res.ok) throw new Error("Summoner not found");

  return res.json();
}

export async function getSummoner(puuid: string, region: string) {
  const regionHost = REGION_HOSTS[region];

  const res = await fetch(
    `https://${regionHost}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
    { headers: { "X-Riot-Token": API_KEY } },
  );

  if (!res.ok) throw new Error("Summoner not found");

  return res.json();
}

// Rank info
export async function getRank(puuid: string, region: string) {
  const regionHost = REGION_HOSTS[region];

  const res = await fetch(
    `https://${regionHost}.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`,
    { headers: { "X-Riot-Token": API_KEY } },
  );

  if (!res.ok) throw new Error("Rank not found");

  return res.json();
}

// Match history
export async function getMatchIds(puuid: string, region: string, count = 50, start = 0) {
  const regionHost = MATCH_REGION_HOSTS[region];

  const res = await fetch(
    `https://${regionHost}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?count=${count}&start=${start}`,
    { headers: { "X-Riot-Token": API_KEY } },
  );

  if (!res.ok) throw new Error("Match history not found");

  return res.json();
}

export async function getMatch(matchId: string, region: string) {
  const regionHost = MATCH_REGION_HOSTS[region];

  const res = await fetch(
    `https://${regionHost}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
    { headers: { "X-Riot-Token": API_KEY } },
  );

  if (!res.ok) throw new Error("Match not found");

  return res.json();
}

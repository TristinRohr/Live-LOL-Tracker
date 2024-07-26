const fetch = require('node-fetch');
require('dotenv').config();

const RIOT_API_KEY = process.env.RIOT_API_KEY;
console.log('Using Riot API Key:', RIOT_API_KEY);

exports.fetchPuuidByRiotId = async (gameName, tagLine) => {
    console.log(`Fetching PUUID for Riot ID: ${gameName}#${tagLine}`);
    const response = await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`, {
      headers: {
        'X-Riot-Token': RIOT_API_KEY
      }
    });
  
    const responseBody = await response.text();
  
    if (!response.ok) {
      console.error('Failed to fetch PUUID by Riot ID', response.status, responseBody);
      throw new Error('Failed to fetch PUUID by Riot ID');
    }
  
    const data = JSON.parse(responseBody);
    console.log('Fetched PUUID:', data);
    return data;
  };

exports.fetchUserStats = async (puuid) => {
  console.log(`Fetching user stats for PUUID: ${puuid}`);
  const response = await fetch(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${RIOT_API_KEY}`);
  if (!response.ok) {
    console.error('Failed to fetch user stats', response.statusText);
    throw new Error('Failed to fetch user stats');
  }
  const data = await response.json();
  console.log('Fetched user stats:', data);
  return data;
};

exports.fetchLiveMatch = async (puuid) => {
  console.log(`Fetching live match data for PUUID: ${puuid}`);
  const response = await fetch(`https://na1.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${puuid}?api_key=${RIOT_API_KEY}`);
  if (!response.ok) {
    console.error('Failed to fetch live match data', response.statusText);
    throw new Error('Failed to fetch live match data');
  }
  const data = await response.json();
  console.log('Fetched live match data:', data);
  return data;
};
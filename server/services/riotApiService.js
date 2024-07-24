const fetch = require('node-fetch');
const config = require('../config/config');

const RIOT_API_KEY = config.riotApiKey;

exports.fetchGameData = async () => {
    const response = await fetch(`https://<region>.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/<summonerId>?api_key=${RIOT_API_KEY}`);
    if (!response.ok) {
        throw new Error('Failed to fetch game data');
    }
    return response.json();
};
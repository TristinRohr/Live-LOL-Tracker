const riotApiService = require('../services/riotApiService');
const NodeCache = require("node-cache");
const axios = require('axios');

const myCache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

exports.getMatchHistory = async (req, res) => {
  const { gameName, tagLine } = req.params;
  const cacheKey = `matchHistory-${gameName}-${tagLine}`;

  if (myCache.has(cacheKey)) {
    console.log('Serving from cache:', cacheKey);
    return res.json(myCache.get(cacheKey));
  }

  try {
    const puuidResponse = await axios.get(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${process.env.RIOT_API_KEY}`);
    const puuid = puuidResponse.data.puuid;
    
    const matchHistoryResponse = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${process.env.RIOT_API_KEY}`);
    const matchIds = matchHistoryResponse.data;

    const matchDetailsPromises = matchIds.map(async (matchId) => {
      const matchResponse = await axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.RIOT_API_KEY}`);
      const matchData = matchResponse.data;

      const participantData = matchData.info.participants.map(participant => ({
        championName: participant.championName,
        kills: participant.kills,
        deaths: participant.deaths,
        assists: participant.assists,
        goldEarned: participant.goldEarned,
        totalDamageDealt: participant.totalDamageDealt,
        wardsPlaced: participant.wardsPlaced,
        items: [
          participant.item0,
          participant.item1,
          participant.item2,
          participant.item3,
          participant.item4,
          participant.item5,
          participant.item6
        ]
      }));

      return {
        win: matchData.info.participants.find(participant => participant.puuid === puuid).win,
        kills: matchData.info.participants.find(participant => participant.puuid === puuid).kills,
        deaths: matchData.info.participants.find(participant => participant.puuid === puuid).deaths,
        assists: matchData.info.participants.find(participant => participant.puuid === puuid).assists,
        goldEarned: matchData.info.participants.find(participant => participant.puuid === puuid).goldEarned,
        totalDamageDealt: matchData.info.participants.find(participant => participant.puuid === puuid).totalDamageDealt,
        wardsPlaced: matchData.info.participants.find(participant => participant.puuid === puuid).wardsPlaced,
        championName: matchData.info.participants.find(participant => participant.puuid === puuid).championName,
        participants: participantData
      };
    });

    const matchDetails = await Promise.all(matchDetailsPromises);

    // Cache the result
    myCache.set(cacheKey, matchDetails);

    res.json(matchDetails);
  } catch (error) {
    console.error('Error fetching match history:', error);
    res.status(500).json({ error: 'Failed to fetch match history' });
  }
};

exports.getUserStats = async (req, res) => {
  const { gameName, tagLine } = req.params;
  const cacheKey = `userStats-${gameName}-${tagLine}`;

  if (myCache.has(cacheKey)) {
    console.log('Serving from cache:', cacheKey);
    return res.json(myCache.get(cacheKey));
  }

  try {
    const puuid = await riotApiService.fetchPuuidByRiotId(gameName, tagLine);
    const userStats = await riotApiService.fetchUserStats(puuid);

    // Cache the result
    myCache.set(cacheKey, userStats);

    res.json(userStats);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).send('Error fetching user stats');
  }
};

// exports.getLiveMatch = async (req, res) => {
//     const { gameName, tagLine } = req.params;
  
//     try {
//       const puuid = await riotApiService.fetchPuuidByRiotId(gameName, tagLine);
//       const liveMatchData = await riotApiService.fetchLiveMatchData(puuid);
//       res.json(liveMatchData);
//     } catch (error) {
//       if (error.message.includes('404')) {
//         console.error('No live match data found:', error);
//         res.status(200).json({ message: 'No live game found' });
//       } else {
//         console.error('Error fetching live match data:', error);
//         res.status(500).json({ error: 'Failed to fetch live match data' });
//       }
//     }
//   };

exports.getLiveClientData = async (req, res) => {
  try {
    const response = await axios.get('https://127.0.0.1:2999/liveclientdata/allgamedata', {
      headers: {
        'Accept': 'application/json'
      },
      httpsAgent: new (require('https')).Agent({ rejectUnauthorized: false })
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching live client data:', error.message);
    res.status(500).json({ error: 'Failed to fetch live client data' });
  }
};
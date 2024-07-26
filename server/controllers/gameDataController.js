const riotApiService = require('../services/riotApiService');

exports.getUserStats = async (req, res, next) => {
  try {
    const { gameName, tagLine } = req.params;
    console.log(`Request to get user stats for: ${gameName}#${tagLine}`);
    const accountData = await riotApiService.fetchPuuidByRiotId(gameName, tagLine);
    const userStats = await riotApiService.fetchUserStats(accountData.puuid);
    res.json(userStats);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    next(error);
  }
};

exports.getLiveMatch = async (req, res, next) => {
  try {
    const { gameName, tagLine } = req.params;
    console.log(`Request to get live match for: ${gameName}#${tagLine}`);
    const accountData = await riotApiService.fetchPuuidByRiotId(gameName, tagLine);
    const liveMatchData = await riotApiService.fetchLiveMatch(accountData.puuid);
    res.json(liveMatchData);
  } catch (error) {
    console.error('Error fetching live match data:', error);
    next(error);
  }
};
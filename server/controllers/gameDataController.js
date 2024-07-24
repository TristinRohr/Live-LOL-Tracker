const riotApiService = require('../services/riotApiService');

exports.getGameData = async (req, res, next) => {
    try {
        const gameData = await riotApiService.fetchGameData();
        res.json(gameData);
    } catch (error) {
        next(error);
    }
};
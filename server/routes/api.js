const express = require('express');
const router = express.Router();
const gameDataController = require('../controllers/gameDataController');

// Route for fetching user stats
router.get('/user-stats/:gameName/:tagLine', gameDataController.getUserStats);

// Route for fetching live match data
router.get('/live-match/:gameName/:tagLine', gameDataController.getLiveMatch);

module.exports = router;
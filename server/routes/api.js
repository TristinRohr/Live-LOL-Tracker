const express = require('express');
const router = express.Router();
const gameDataController = require('../controllers/gameDataController');

router.get('/user-stats/:gameName/:tagLine', gameDataController.getUserStats);
router.get('/match-history/:gameName/:tagLine', gameDataController.getMatchHistory);
// router.get('/live-match/:gameName/:tagLine', gameDataController.getLiveMatch);

module.exports = router;
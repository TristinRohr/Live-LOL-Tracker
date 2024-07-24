import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlayerList from './PlayerList';

const GameData = () => {
  const [gameData, setGameData] = useState(null);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await axios.get('/api/game-data');
        setGameData(response.data);
      } catch (error) {
        console.error('Error fetching game data:', error);
      }
    };

    fetchGameData();
  }, []);

  return (
    <div>
      <h1>League of Legends Overlay</h1>
      {gameData ? (
        <div>
          <p>Game ID: {gameData.gameId}</p>
          <PlayerList players={gameData.participants} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GameData;
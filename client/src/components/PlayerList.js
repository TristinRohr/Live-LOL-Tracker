import React from 'react';

const PlayerList = ({ players }) => (
  <ul>
    {players.map(player => (
      <li key={player.summonerName}>{player.summonerName} - {player.championId}</li>
    ))}
  </ul>
);

export default PlayerList;
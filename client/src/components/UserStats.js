import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserStats = ({ riotId }) => {
  const [userStats, setUserStats] = useState(null);
  const [matchHistory, setMatchHistory] = useState(null);
  const [liveGameData, setLiveGameData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [gameName, tagLine] = riotId.split('#');
        console.log('Fetching stats for:', riotId);
        const statsResponse = await axios.get(`http://localhost:3001/api/user-stats/${gameName}/${tagLine}`);
        console.log('Fetched user stats:', statsResponse.data);
        setUserStats(statsResponse.data);

        console.log('Fetching match history for:', riotId);
        const matchHistoryResponse = await axios.get(`http://localhost:3001/api/match-history/${gameName}/${tagLine}`);
        console.log('Fetched match history:', matchHistoryResponse.data);
        setMatchHistory(matchHistoryResponse.data);

        console.log('Fetching live game data');
        const liveGameResponse = await axios.get(`http://localhost:3001/api/live-client-data`);
        console.log('Fetched live game data:', liveGameResponse.data);
        setLiveGameData(liveGameResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      }
    };

    fetchStats();
  }, [riotId]);

  if (error) return <div>{error}</div>;
  if (!userStats || !matchHistory) return <div>Loading...</div>;

  const profileIconUrl = `https://ddragon.leagueoflegends.com/cdn/14.14.1/img/profileicon/${userStats.profileIconId}.png`;

  return (
    <div>
      <h2>User Stats</h2>
      <img src={profileIconUrl} alt="Profile Icon" style={{ width: '50px', height: '50px' }} />
      <p>Name: {userStats.name}</p>
      <p>Summoner Level: {userStats.summonerLevel}</p>
      <p>Game Name and Tagline: {riotId}</p>
      <h2>Match History</h2>
      {matchHistory.map((match, index) => {
        console.log(`Match ${index + 1}:`, match);
        return (
          <div key={index}>
            <p>Champion: {match.championName}</p>
            <img src={`https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/${match.championName}.png`} alt={match.championName} />
            <p>Win: {match.win ? 'Yes' : 'No'}</p>
            <p>Kills: {match.kills}</p>
            <p>Deaths: {match.deaths}</p>
            <p>Assists: {match.assists}</p>
            <p>Gold Earned: {match.goldEarned}</p>
            <p>Total Damage Dealt: {match.totalDamageDealt}</p>
            <p>Wards Placed: {match.wardsPlaced}</p>
            <div>
              <h3>Participants</h3>
              {match.participants.map((participant, idx) => {
                console.log(`Participant ${idx + 1}:`, participant);
                return (
                  <div key={idx}>
                    <p>{participant.championName}</p>
                    <img src={`https://ddragon.leagueoflegends.com/cdn/14.14.1/img/champion/${participant.championName}.png`} alt={participant.championName} />
                    <p>Kills: {participant.kills}</p>
                    <p>Deaths: {participant.deaths}</p>
                    <p>Assists: {participant.assists}</p>
                    <p>Gold Earned: {participant.goldEarned}</p>
                    <p>Total Damage Dealt: {participant.totalDamageDealt}</p>
                    <p>Wards Placed: {participant.wardsPlaced}</p>
                    <div>
                      <h4>Items</h4>
                      {participant.items.map((item, itemIdx) => {
                        console.log(`Item ${itemIdx + 1}:`, item);
                        return (
                          item !== 0 && (
                            <img
                              key={itemIdx}
                              src={`https://ddragon.leagueoflegends.com/cdn/14.14.1/img/item/${item}.png`}
                              alt={`Item ${item}`}
                              style={{ width: '32px', height: '32px', margin: '2px' }}
                            />
                          )
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <h2>Live Game</h2>
      {liveGameData ? (
        <div>
          <p>Game Mode: {liveGameData.gameData.gameMode}</p>
          <p>Game Time: {liveGameData.gameData.gameTime}</p>
          <p>Map Name: {liveGameData.gameData.mapName}</p>
          <p>Map Terrain: {liveGameData.gameData.mapTerrain}</p>
          <div>
            <h3>Active Player</h3>
            <p>Summoner Name: {liveGameData.activePlayer.summonerName}</p>
            <p>Level: {liveGameData.activePlayer.level}</p>
            <p>Current Gold: {liveGameData.activePlayer.currentGold}</p>
            <p>Current Health: {liveGameData.activePlayer.championStats.currentHealth}</p>
            <p>Max Health: {liveGameData.activePlayer.championStats.maxHealth}</p>
            <p>Ability Power: {liveGameData.activePlayer.championStats.abilityPower}</p>
            <p>Attack Damage: {liveGameData.activePlayer.championStats.attackDamage}</p>
            <p>Armor: {liveGameData.activePlayer.championStats.armor}</p>
            <p>Magic Resist: {liveGameData.activePlayer.championStats.magicResist}</p>
            <p>Move Speed: {liveGameData.activePlayer.championStats.moveSpeed}</p>
            <div>
              <h4>Abilities</h4>
              {Object.entries(liveGameData.activePlayer.abilities).map(([key, ability], idx) => (
                <div key={idx}>
                  <p>{key}: {ability.displayName} (Level: {ability.abilityLevel})</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3>All Players</h3>
            {liveGameData.allPlayers.map((player, idx) => (
              <div key={idx}>
                <p>Player: {player.summonerName}</p>
                <p>Champion: {player.championName}</p>
                <p>Level: {player.level}</p>
                <p>Kills: {player.scores.kills}</p>
                <p>Deaths: {player.scores.deaths}</p>
                <p>Assists: {player.scores.assists}</p>
                <p>CS: {player.scores.creepScore}</p>
                <div>
                  <h4>Items</h4>
                  {player.items.map((item, itemIdx) => (
                    <img
                      key={itemIdx}
                      src={`https://ddragon.leagueoflegends.com/cdn/14.14.1/img/item/${item.itemID}.png`}
                      alt={`Item ${item.itemID}`}
                      style={{ width: '32px', height: '32px', margin: '2px' }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div>
            <h3>Events</h3>
            {liveGameData.events.Events.map((event, idx) => (
              <div key={idx}>
                <p>Event Name: {event.EventName}</p>
                <p>Event Time: {event.EventTime}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>No live game found</div>
      )}
    </div>
  );
};

export default UserStats;
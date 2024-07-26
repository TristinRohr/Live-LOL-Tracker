import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LiveMatch = ({ gameName, tagLine }) => {
  const [matchData, setMatchData] = useState(null);

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        console.log(`Fetching live match for: ${gameName}#${tagLine}`);
        const result = await axios.get(`http://localhost:3001/api/live-match/${gameName}/${tagLine}`);
        console.log('Fetched live match data:', result.data);
        setMatchData(result.data);
      } catch (error) {
        console.error("Error fetching live match data:", error);
      }
    };
    fetchMatchData();
  }, [gameName, tagLine]);

  return (
    <div>
      <h2>Live Match for {`${gameName}#${tagLine}`}</h2>
      {matchData ? (
        <pre>{JSON.stringify(matchData, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LiveMatch;
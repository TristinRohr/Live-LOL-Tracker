import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserStats = ({ gameName, tagLine }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log(`Fetching stats for: ${gameName}#${tagLine}`);
        const result = await axios.get(`http://localhost:3001/api/user-stats/${gameName}/${tagLine}`);
        console.log('Fetched user stats:', result.data);
        setStats(result.data);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };
    fetchStats();
  }, [gameName, tagLine]);

  return (
    <div>
      <h2>{`${gameName}#${tagLine}'s Stats`}</h2>
      {stats ? (
        <pre>{JSON.stringify(stats, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserStats;
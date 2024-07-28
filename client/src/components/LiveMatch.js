import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LiveMatch = ({ riotId }) => {
  const [liveMatch, setLiveMatch] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLiveMatch = async () => {
      try {
        const [gameName, tagLine] = riotId.split('#');
        const response = await axios.get(`/api/live-match/${gameName}/${tagLine}`);
        setLiveMatch(response.data);
      } catch (error) {
        setError('Failed to fetch live match data');
      }
    };

    fetchLiveMatch();
  }, [riotId]);

  if (error) return <div>{error}</div>;
  if (!liveMatch) return <div>Loading...</div>;

  return (
    <div>
      <h2>Live Match</h2>
      <pre>{JSON.stringify(liveMatch, null, 2)}</pre>
    </div>
  );
};

export default LiveMatch;
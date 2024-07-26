import React, { useState } from 'react';

const Login = ({ setGameName, setTagLine }) => {
  const [gameName, setLocalGameName] = useState('');
  const [tagLine, setLocalTagLine] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Logging in with Riot ID: ${gameName}#${tagLine}`);
    setGameName(gameName);
    setTagLine(tagLine);
  };

  return (
    <div>
      <h2>Enter Riot ID</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="gameName">Summoners Name:</label>
          <input
            type="text"
            id="gameName"
            value={gameName}
            onChange={(e) => setLocalGameName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="tagLine">Tag Line:</label>
          <input
            type="text"
            id="tagLine"
            value={tagLine}
            onChange={(e) => setLocalTagLine(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
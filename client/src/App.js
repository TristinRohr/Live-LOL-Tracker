import React, { useState } from 'react';
import UserStats from './components/UserStats';
import LiveMatch from './components/LiveMatch';
import Login from './components/Login';
import './App.css';

const App = () => {
  const [gameName, setGameName] = useState('');
  const [tagLine, setTagLine] = useState('');

  return (
    <div className="App">
      {!gameName || !tagLine ? (
        <Login setGameName={setGameName} setTagLine={setTagLine} />
      ) : (
        <div>
          <UserStats gameName={gameName} tagLine={tagLine} />
          <LiveMatch gameName={gameName} tagLine={tagLine} />
        </div>
      )}
    </div>
  );
};

export default App;
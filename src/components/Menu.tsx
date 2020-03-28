import React, { useState } from 'react';

type MenuProps = {
  setGameID: Function;
};

export const Menu: React.FC<MenuProps> = ({ setGameID }) => {
  const [playerName, setPlayerName] = useState<string>();
  const [joinOrHost, setJoinOrHost] = useState<'join' | 'host'>('join');

  return (
    <div>
      <h1>Menu</h1>
      <div>
        <div>
          <input
            type="text"
            placeholder="Name (use your real one)"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="join">Join</label>
          <input
            type="radio"
            id="join"
            name="joinOrHost"
            checked={joinOrHost === 'join'}
            onClick={() => setJoinOrHost('join')}
          />
        </div>
        {joinOrHost === 'join' && (
          <div>
            <input type="text" placeholder="Game ID" maxLength={4} />
          </div>
        )}
        <div>
          <label htmlFor="host">Host</label>
          <input
            type="radio"
            id="host"
            name="joinOrHost"
            checked={joinOrHost === 'host'}
            onClick={() => setJoinOrHost('host')}
          />
        </div>
        <div>
          <button>Go</button>
        </div>
      </div>
    </div>
  );
};

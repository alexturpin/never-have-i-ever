import React, { useState } from 'react';
import { createGame, GAME_ID_LENGTH } from '../services/game';

type MenuProps = {
  setGameId: Function;
};

export const Menu: React.FC<MenuProps> = ({ setGameId }) => {
  const [playerName, setPlayerName] = useState<string>('');
  const [joinOrHost, setJoinOrHost] = useState<'join' | 'host'>('join');
  const [joinGameId, setJoinGameId] = useState<string>('');
  const [creatingGame, setCreatingGame] = useState<boolean>(false);

  const doJoinOrHost = async () => {
    if (playerName.length === 0) return;

    if (joinOrHost === 'host') {
      setCreatingGame(true);
      const gameId = await createGame(playerName);
      setGameId(gameId);
      setCreatingGame(false);
    }
  };

  return (
    <div>
      <h1>Menu</h1>
      <div>
        <div>
          <input
            type="text"
            placeholder="Name (use your real one)"
            value={playerName}
            onChange={(e) => setPlayerName(e.currentTarget.value)}
          />
        </div>
        <div>
          <label htmlFor="join">Join</label>
          <input
            type="radio"
            id="join"
            name="joinOrHost"
            checked={joinOrHost === 'join'}
            onChange={() => setJoinOrHost('join')}
          />
        </div>
        {joinOrHost === 'join' && (
          <div>
            <input
              type="text"
              placeholder="Game ID"
              maxLength={4}
              value={joinGameId}
              onChange={(e) => setJoinGameId(e.currentTarget.value)}
            />
          </div>
        )}
        <div>
          <label htmlFor="host">Host</label>
          <input
            type="radio"
            id="host"
            name="joinOrHost"
            checked={joinOrHost === 'host'}
            onChange={() => setJoinOrHost('host')}
          />
        </div>
        <div>
          <button
            onClick={() => doJoinOrHost()}
            disabled={
              playerName.length === 0 ||
              (joinOrHost === 'join' && joinGameId.length !== GAME_ID_LENGTH) ||
              creatingGame
            }>
            Go
          </button>
        </div>
      </div>
    </div>
  );
};

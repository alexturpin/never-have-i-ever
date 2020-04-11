import { db, auth } from './firebase';

export const GAME_ID_LENGTH = 1;
const MAX_CREATION_ATTEMPTS = 10;

const games = db.collection('games');

const generateRandomGameId = () => {
  let gameId = '';
  for (let i = 0; i < GAME_ID_LENGTH; i++) {
    gameId += String.fromCharCode(65 + Math.floor(Math.random() * 4));
  }
  return gameId;
};

export type Player = {
  uid: string;
  name: string;
};

export type Game = {
  players: Player[];
};

const getInitialGame = (hostUid: string, hostName: string): Game => ({
  players: [{ uid: hostUid, name: hostName }],
});

export const createGame = async (hostName: string) => {
  await auth.signInAnonymously();
  if (!auth.currentUser) return;

  for (var i = 0; i < MAX_CREATION_ATTEMPTS; i++) {
    const gameId = generateRandomGameId();
    const gameRef = games.doc(gameId);
    const game = await gameRef.get();

    if (game.exists) continue;

    gameRef.set(getInitialGame(auth.currentUser.uid, hostName));
    return gameId;
  }

  return null;
};

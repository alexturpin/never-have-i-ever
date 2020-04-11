import React, { useState } from 'react';
import { Menu } from './Menu';

export const App: React.FC = () => {
  const [gameId, setGameId] = useState<string | null>(null);

  return <Menu setGameId={setGameId} />;
};

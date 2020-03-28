import React, { useState } from 'react';
import { Menu } from './Menu';

export const App: React.FC = () => {
  const [gameID, setGameID] = useState<string | null>(null);

  return <Menu setGameID={setGameID}></Menu>;
};

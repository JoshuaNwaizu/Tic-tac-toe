import React from 'react';
import { TicTacToeProvider } from './context/TicTacToeContext';
import Game from './components/Game';

const App: React.FC = () => {
  return (
    <TicTacToeProvider>
      <div className="App">
        <h1>Tic Tac Toe</h1>
        <Game />
      </div>
    </TicTacToeProvider>
  );
};

export default App;
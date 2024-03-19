import './App.css';
import React, { useState } from 'react';
import Scoreboard from './Components/Scoreboard.jsx';
import Board from './Components/Board.jsx';

function App() {
  const boardDefault = Array(4).fill(Array(4).fill(null));
  const boardTest = [[2,null,null,null],
  [null,null,null,null],
  [null,null,null,null],
  [null,null,null,null], ]

  const [board, setBoard] = useState(boardTest);

  
  return (
    <div className="App">
      <Scoreboard />
      <Board board={board} setBoard={setBoard} />
    </div>
  );
}

export default App;

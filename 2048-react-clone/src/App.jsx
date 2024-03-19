import './App.css';
import React, { useState } from 'react';
import Scoreboard from './Components/Scoreboard.jsx';
import Board from './Components/Board.jsx';

function App() {
  // const boardDefault = Array(4).fill(Array(4).fill(null));
  const boardTest = 
  [[null,2,null,null],
  [2,2,2,2],
  [null,null,2,2],
  [2,null,2,2], ]

  const [board, setBoard] = useState(boardTest);

  function moveRight() {
    //loop over board
    const newBoard = [...board]
    for (let row = 0; row < 4; row++) {
      let index1 = 3;
      let index2 = 2;
      let nullPt = undefined;

      while (newBoard[row][index2] !== undefined) {

        if (newBoard[row][index1] === newBoard[row][index2] && newBoard[row][index1] !== null) {
          if (nullPt !== undefined) {
            newBoard[row][nullPt] = newBoard[row][index1] * 2;
            newBoard[row][index2] = null;
            newBoard[row][index1] = null;
            nullPt = index1;
          }
          else {
            newBoard[row][index1] = newBoard[row][index1] * 2;
            newBoard[row][index2] = null;
          }
          index1--;
          index2--;
          continue;
        }
        if (newBoard[row][index2] === null) {
          index2--;
          continue;
        }
        if (newBoard[row][index1] === null ) {
          if (nullPt === undefined) nullPt = index1;
          if (index2 - 1 < 0) {
            newBoard[row][nullPt] = newBoard[row][index2]
            newBoard[row][index2] = null;
          }
          index1--;
          index2--;
          continue;
        }
        if (newBoard[row][index1] && nullPt !== undefined) {
          newBoard[row][nullPt] = newBoard[row][index1]
          newBoard[row][index1] = null;
          index1--;
        }
      }
    }
    setBoard(newBoard);
  }

  document.addEventListener("keydown", e => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      console.log('up!')
      // moveUp();
    }
    else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      console.log('left!')
    }
    else if (e.key === 'ArrowRight') {
      e.preventDefault();
      console.log('right!')
      moveRight();
    }
    else if (e.key === 'ArrowDown') {
      e.preventDefault();
      console.log('down!')
    }
  })
  
  //move right
  //until element is undefined, or a number

  
  return (
    <div className="App">
      <Scoreboard />
      <Board board={board} setBoard={setBoard} />
    </div>
  );
}

export default App;

import './App.css';
import React, { useState } from 'react';
import Scoreboard from './Components/Scoreboard.jsx';
import Board from './Components/Board.jsx';

function App() {
  // const boardDefault = Array(4).fill(Array(4).fill(null));
  const boardTest = 
  [[2,null,null,null],
  [2,null,null,null],
  [null,null,null,null],
  [null,null,null,null], ]

  const [board, setBoard] = useState(boardTest);

  function moveRight() {

    const newBoard = [...board]

    for (let row = 0; row < 4; row++) {
      let result = newBoard[row].filter( (el) => el !== null);
      let i = result.length - 1;

      while (i > 0) {
        if (result[i] === result[i - 1]) {
          result[i] *= 2;
          result[i - 1] = null;
          i -= 2;
        } else {
          i--;
        }
      }
      
      result = result.filter( (el) => el !== null);
      
      while (result.length < 4) {
        result.unshift(null);
      }

      newBoard[row] = result;
    }
    return newBoard;
  }
  
  function moveLeft() {

    const newBoard = [...board]

    for (let row = 0; row < 4; row++) {
      let result = newBoard[row].filter( (el) => el !== null);
      let i = 0;

      while (i < result.length - 1) {
        if (result[i] === result[i + 1]) {
          console.log('Made it to while loop', row)
          result[i] *= 2;
          result[i + 1] = null;
          i += 2;
        } else {
          i++;
        }
      }
      
      result = result.filter( (el) => el !== null);
      
      while (result.length < 4) {
        result.push(null);
      }

      newBoard[row] = result;
    }
    return newBoard;
  }

  function moveUp() {
    const flippedBoard = Array(4).fill().map(() => Array(4).fill(null));
    console.log('flippedBoard ', flippedBoard)
    board.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        flippedBoard[colIndex][rowIndex] = tile;
      })
    })
   const newBoard = moveLeft();
    
   const unFlippedBoard = Array(4).fill().map(() => Array(4).fill(null));
    newBoard.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        unFlippedBoard[rowIndex][colIndex] = tile;
      })
    })
    return unFlippedBoard;
  }

  

  document.addEventListener("keydown", e => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      console.log('up!')
      const newBoard = moveUp();
      setBoard(newBoard);
    }
    else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      console.log('left!');
      const newBoard = moveLeft();
      setBoard(newBoard);
    }
    else if (e.key === 'ArrowRight') {
      e.preventDefault();
      console.log('right!')
      const newBoard = moveRight();
      setBoard(newBoard);
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

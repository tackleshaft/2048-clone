import './App.css';
import React, { useState, useEffect } from 'react';
import Scoreboard from './Components/Scoreboard.jsx';
import Board from './Components/Board.jsx';

function App() {
  // const boardDefault = Array(4).fill(Array(4).fill(null));
  const boardTest = 
  [[2,null,null,null],
  [2,null,2,null],
  [null,null,2,null],
  [8,4,null,4], ]

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
    board.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        flippedBoard[colIndex][rowIndex] = tile;
      })
    })

    for (let row = 0; row < 4; row++) {
      let result = flippedBoard[row].filter( (el) => el !== null);
      let i = 0;

      while (i < result.length - 1) {
        if (result[i] === result[i + 1]) {
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

      flippedBoard[row] = result;
    }
    
    const unFlippedBoard = Array(4).fill().map(() => Array(4).fill(null));
    flippedBoard.forEach((row, rowIndex) => {
      row.forEach((tile, colIndex) => {
        unFlippedBoard[colIndex][rowIndex] = tile;
      })
    })
    
    return unFlippedBoard;
  }

  
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault(); // Prevent default behavior
      
      if (e.key === 'ArrowUp') {
        console.log('up!')
        const newBoard = moveUp();
        setBoard(newBoard);
      }
      else if (e.key === 'ArrowLeft') {
        console.log('left!');
        const newBoard = moveLeft();
        setBoard(newBoard);
      }
      else if (e.key === 'ArrowRight') {
        console.log('right!')
        const newBoard = moveRight();
        setBoard(newBoard);
      }
      else if (e.key === 'ArrowDown') {
        console.log('down!')
      }
    };
  
    document.addEventListener("keydown", handleKeyDown);
  
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  
  return (
    <div className="App">
      <Scoreboard />
      <Board board={board} setBoard={setBoard} />
    </div>
  );
}

export default App;

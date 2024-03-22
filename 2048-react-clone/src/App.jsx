import './App.css';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import Scoreboard from './Components/Scoreboard.jsx';
import Board from './Components/Board.jsx';

function App() {
  // const boardDefault = Array(4).fill(Array(4).fill(null));
  const boardTest = 
  [[2,null,null,null],
  [2,null,2,null],
  [null,null,2,null],
  [4,8,8,8], ]

  const [board, setBoard] = useState(boardTest);

  const rotateLeft = function (matrix) {
    const rows = matrix.length;
    const columns = matrix[0].length;
    const res = [];
    for (let row = 0; row < rows; ++row) {
      res.push([]);
      for (let column = 0; column < columns; ++column) {
        res[row][column] = matrix[column][columns - row - 1];
      }
    }
    return res;
  };

  const rotateRight = function(matrix) {
    const rows = matrix.length;
    const columns = matrix[0].length;
    const res = [];
    for (let row = 0; row < rows; ++row) {
        res.push([]);
        for (let column = 0; column < columns; ++column) {
            res[row][column] = matrix[rows - column - 1][row];
        }
    }
    return res;
};

  function moveRight() {

    const newBoard = board.map((array) => [...array]);

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
    setBoard(newBoard);
  }
  
  function moveLeft() {

    const newBoard = board.map((array) => [...array]);

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
    setBoard(newBoard);
  }

  function moveUp() {

    let newBoard = board.map((array) => [...array]);

    const rotatedBoard = rotateLeft(newBoard);
    
    for (let row = 0; row < 4; row++) {
      let result = rotatedBoard[row].filter( (el) => el !== null);
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

      rotatedBoard[row] = result;
    }

    newBoard = rotateRight(rotatedBoard)
    setBoard(newBoard);
  }

  function moveDown() {
    
    let newBoard = board.map((array) => [...array]);

    const rotatedBoard = rotateRight(newBoard);
    
    for (let row = 0; row < 4; row++) {
      let result = rotatedBoard[row].filter( (el) => el !== null);
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

      rotatedBoard[row] = result;
    }

    newBoard = rotateLeft(rotatedBoard)
    setBoard(newBoard);

  }
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault(); // Prevent default behavior
      
      if (e.key === 'ArrowUp') {
        console.log('up!')
        moveUp();
      }
      else if (e.key === 'ArrowLeft') {
        console.log('left!');
        moveLeft();
      }
      else if (e.key === 'ArrowRight') {
        console.log('right!')
        moveRight();
      }
      else if (e.key === 'ArrowDown') {
        console.log('down!');
        moveDown();
      }
    };
      document.addEventListener("keydown", handleKeyDown);
    
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
  }, [board]);

  
  return (
    <div className="App">
      <Scoreboard />
      <Board board={board} setBoard={setBoard} />
    </div>
  );
}

export default App;

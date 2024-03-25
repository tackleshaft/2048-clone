import './App.css';
import React, { useState, useEffect } from 'react';
import Scoreboard from './Components/Scoreboard.jsx';
import Board from './Components/Board.jsx';

function App() {

  function startBoard() {
  const boardDefault = Array(4).fill(Array(4).fill(null));
  const newBoard = addTile(addTile(boardDefault));
  return newBoard;
  }

  const testBoard = 
  [[4,32,8,4], 
  [2,16,128,8], 
  [4,32,16,4], 
  [1024,1024,8,2]]

  const [board, setBoard] = useState(testBoard);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameStatus, setGameStatus] = useState({
    gameOver: false,
    gameWon: false,
  });


  function checkGameOver(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 2048) {
              return {
                gameOver: false,
                gameWon: true,
              }
            }
            if (j < matrix[i].length - 1 && matrix[i][j] === matrix[i][j + 1]) {
                return {
                  gameOver: false,
                  gameWon: false,
                };
            }
            if (i < matrix.length - 1 && matrix[i][j] === matrix[i + 1][j]) {
                return {
                  gameOver: false,
                  gameWon: false,
                };
            }
        }
    }
    return {
      gameOver: true,
      gameWon: false,
    };
}
  

  function rotateLeft(matrix) {
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

  function rotateRight(matrix) {
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

    let newBoard = board.map((array) => [...array]);

    for (let row = 0; row < 4; row++) {
      let result = newBoard[row].filter( (el) => el !== null);
      let i = result.length - 1;
      while (i > 0) {
        if (result[i] === result[i - 1]) {
          result[i] *= 2;
          let newScore = score + result[i];
          setScore(newScore);
          if (newScore >= highScore) setHighScore(newScore);
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
    if (JSON.stringify(board) !== JSON.stringify(newBoard)) newBoard = addTile(newBoard);
    if (!(JSON.stringify(newBoard).includes('null'))) {
      setGameStatus(checkGameOver(newBoard));
    }
    setBoard(newBoard);
  }
  
  function moveLeft() {

    let newBoard = board.map((array) => [...array]);

    for (let row = 0; row < 4; row++) {
      let result = newBoard[row].filter( (el) => el !== null);
      let i = 0;

      while (i < result.length - 1) {
        if (result[i] === result[i + 1]) {
          result[i] *= 2;
          let newScore = score + result[i];
          setScore(newScore);
          if (newScore >= highScore) setHighScore(newScore);
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
    if (JSON.stringify(board) !== JSON.stringify(newBoard)) newBoard = addTile(newBoard);
    if (!(JSON.stringify(newBoard).includes('null'))) {
      setGameStatus(checkGameOver(newBoard));
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
          let newScore = score + result[i];
          setScore(newScore);
          if (newScore >= highScore) setHighScore(newScore);
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

    newBoard = rotateRight(rotatedBoard);
    if (JSON.stringify(board) !== JSON.stringify(newBoard)) newBoard = addTile(newBoard);
    if (!(JSON.stringify(newBoard).includes('null'))) {
      setGameStatus(checkGameOver(newBoard));
    }
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
          let newScore = score + result[i];
          setScore(newScore);
          if (newScore >= highScore) setHighScore(newScore);
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

    newBoard = rotateLeft(rotatedBoard);
    if (JSON.stringify(board) !== JSON.stringify(newBoard)) newBoard = addTile(newBoard);
    if (!(JSON.stringify(newBoard).includes('null'))) {
      setGameStatus(checkGameOver(newBoard));
    }
    setBoard(newBoard);
  }
  
  function addTile(board) {

    const newRowIndex = Math.floor(Math.random() * 4);
    const newColIndex = Math.floor(Math.random() * 4);
    
    if (board[newRowIndex][newColIndex] !== null) return addTile(board);
    
    else {
      let newBoard = board.map((array) => [...array]);
      newBoard[newRowIndex][newColIndex] = 2;
      return newBoard;
    }

  }

  useEffect(() => {
      if (gameStatus.gameOver) window.alert('Game over!');
      if (gameStatus.gameWon) window.alert('Game won!');
  }, [board])

  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault(); // Prevent default behavior
      
      if (e.key === 'ArrowUp') {
        moveUp();
      }
      else if (e.key === 'ArrowLeft') {
        moveLeft();
      }
      else if (e.key === 'ArrowRight') {
        moveRight();
      }
      else if (e.key === 'ArrowDown') {
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
      <Scoreboard score={score} setBoard={setBoard} setScore={setScore} startBoard={startBoard} highScore={highScore} setGameStatus={setGameStatus}/>
      <Board board={board} setBoard={setBoard} />
    </div>
  );
}

export default App;

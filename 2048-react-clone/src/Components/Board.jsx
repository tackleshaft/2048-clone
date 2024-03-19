import React from "react";
import Tile from './Tile.jsx';

function Board({ board, setBoard }) {


    return (
      <div id="board">
        {board[0].map((tileVal, col) => {return <Tile row={0} col={col} tileVal={tileVal}/>})}
        {board[1].map((tileVal, col) => {return <Tile row={1} col={col} tileVal={tileVal}/>})}
        {board[2].map((tileVal, col) => {return <Tile row={2} col={col} tileVal={tileVal}/>})}
        {board[3].map((tileVal, col) => {return <Tile row={3} col={col} tileVal={tileVal}/>})}
      </div>
    )
}

export default Board
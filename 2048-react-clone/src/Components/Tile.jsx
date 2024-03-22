import React from 'react';

function Tile({ row, col, tileVal }) {
  
  return (
    <div className="tile">{tileVal}</div>
  )
}

export default Tile;
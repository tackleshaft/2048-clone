import React from 'react';

function Tile({ row, col, tileVal }) {

  let tileClassName = 'tile'; // Default class name

  // Define a mapping of tile values to CSS class names
  const valueClassMap = {
  2: 'two',
  4: 'four',
  8: 'eight',
  16: 'sixteen',
  32: 'thirty-two',
  64: 'sixty-four',
  128: 'one-twenty-eight',
  256: 'two-fifty-six',
  512: 'five-twelve',
  1024: 'one-thousand-twenty-four',
  2048: 'two-thousand-forty-eight',
  };

  // If tileVal exists in the mapping, update the tileClassName
  if (valueClassMap[tileVal]) {
    tileClassName += ' ' + valueClassMap[tileVal];
  }

  
  return (
    <div className={tileClassName}>{tileVal}</div>
  )
}

export default Tile;
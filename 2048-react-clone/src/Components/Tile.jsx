import React from 'react';

function Tile({ row, col, tileVal }) {

  let tileClassName = 'tile';

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

  if (valueClassMap[tileVal]) {
    tileClassName += ' ' + valueClassMap[tileVal];
  }

  return (
    <div className={tileClassName}>{tileVal}</div>
  )
}

export default Tile;
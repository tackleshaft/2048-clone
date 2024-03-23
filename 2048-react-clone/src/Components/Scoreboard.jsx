import React from "react";

function Scoreboard({ score, setScore, startBoard, setBoard, highScore, setGameOver }) {
    
    function newGame() {
        setBoard(startBoard());
        setScore(0);
        setGameOver(false);
    }

    return (
        <div>
            <div id="scoreBoard">SCORE</div>
            <div>{score}</div>
            <div id="highScore">highSCORE</div>
            <div>{highScore}</div>
            <button onClick={newGame}>NEW GAME</button>
        </div>
    )
}

export default Scoreboard;
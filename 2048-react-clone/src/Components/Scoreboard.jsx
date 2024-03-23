import React from "react";

function Scoreboard({ score, setScore, startBoard, setBoard }) {
    
    function newGame() {
        setBoard(startBoard());
        setScore(0);
    }

    return (
        <div>
            <div id="scoreBoard">SCORE</div>
            <div>{score}</div>
            <button onClick={newGame}>NEW GAME</button>
        </div>
    )
}

export default Scoreboard;
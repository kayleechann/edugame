import React, { useState, useRef } from "react";
import "./styles.css";
import { buildSquares } from "./components/Square";
import { moveMole, removeMoles } from "./mole.js";
import Score from "./components/Score";
/*import Generator from "./components/Generator";*/
import Mathgen from "./components/Mathgen";

let moleIntervalId;
let timerId;
let squareEls;
let timerDuration = 30;
let moleSpeed = 750;
let setScore;

function startGame(startHandler, timeHandler) {
  startHandler(true);
  timeHandler(timerDuration);
  setScore(0);

  moveMole(squareEls.current.children);
  moleIntervalId = setInterval(() => {
    moveMole(squareEls.current.children);
  }, moleSpeed);

  timerId = setInterval(() => {
    timeHandler((time) => {
      if (time > 0) {
        return time - 1;
      }

      if (time === 0) {
        stopGame(startHandler, timeHandler);
      }
    });
  }, 1000);
}

function stopGame(startHandler, timeHandler) {
  clearTimeout(moleIntervalId);
  clearTimeout(timerId);
  startHandler(false);
  removeMoles(squareEls.current.children);
  timeHandler(timerDuration);
}

export default function App() {
  let [score, setScoreState] = useState(0);
  let [gameStart, setGameStart] = useState(false);
  let [timer, setTimer] = useState(timerDuration);

  let squares = buildSquares(12, setScoreState);
  squareEls = useRef();
  setScore = setScoreState;

  return (
    <div className="App">
      <h1 className="gamename">Whack-a-Math</h1>
      <div className="startButton">
        {gameStart ? (
          <>
            <button onClick={() => stopGame(setGameStart, setTimer)}>
              Stop Game
            </button>
          </>
        ) : (
          <button onClick={() => startGame(setGameStart, setTimer)}>
            Start Game
          </button>
        )}
      </div>
      <Score value={score} />
      <Mathgen />
      <div className="timerDiv">
        {gameStart ? (
          <span className="timer">
            {" "}
            Time Left: {timer} sec
            {/*<button className="enter">Enter</button>*/}
          </span>
        ) : null}
      </div>
      <div className="gridholder">
        <ul id="squares" ref={squareEls}>
          {squares}
        </ul>
      </div>
    </div>
  );
}

import "./App.css";
import Game from "./components/game/game";
import "./components/game/game.css";
import { useState } from "react";
import { createMaze } from "./components/Util/createMaze.js";
import { useEffect } from "react";
import { createTimer } from "./components/Util/timer.js";
import checkNextMove from "./components/Util/checkNextMove";
import findSimplWay from "./components/Util/findSimplWay";

function App() {
  const [size, setSize] = useState({ row: 20, column: 20 });
  
  const [maze, setMaze] = useState(undefined);
  const [whiteMouseMove, setWhiteMouseMove] = useState(0);
  const [blackMouseMove, setBlackMouseMove] = useState(19);
  const [lastWhiteMove, setLastWhiteMove] = useState(undefined);
  const [nextBlackMove, setNextBlackMove] = useState(undefined);
  const [time, setTime] = useState(undefined);
  const [tick, setTick] = useState(0);
  const [way, setWay] = useState(undefined);

  function createNewGame() {
    if (!maze) {
      let newMaze = createMaze(size);
      newMaze[0].whiteMouse = true;
      newMaze[19].blackMouse = true;
      newMaze[390].cheese = true;
      console.log("mouse!");
      setMaze(newMaze);
      let newWay = findSimplWay(19, 390, newMaze, size);
      setWay(newWay);
    }
  }

  function nextWhiteMouseMove(index) {
    if (index == 0 || index) {
      let newMaze = maze;
      newMaze[whiteMouseMove].whiteMouse = false;
      newMaze[index].whiteMouse = true;
      setLastWhiteMove(whiteMouseMove);
      setWhiteMouseMove(index);
      setMaze(newMaze);
    }
  }

  function nextBlackMouseMove(index) {
    if (index == 0 || index) {
      let newMaze = maze;
      newMaze[blackMouseMove].blackMouse = false;
      newMaze[index].blackMouse = true;
      //setBlackMouseMove(index);
      //console.log(blackMouseMove);
      setBlackMouseMove(index);
      setMaze(newMaze);
    }
  }

  createNewGame();

  const timer = createTimer();

  timer.onTick = () => setNextBlackMove(() => way.pop());

  useEffect(() => {
    console.log(tick + "1");
    document.body.addEventListener("keydown", keyHandler);
    function keyHandler(e) {
      if (!time) {
        timer.startTimer();
        setTime(timer);
        console.log(way);
      }

      switch (e.keyCode) {
        case 37:
          nextWhiteMouseMove(checkNextMove(whiteMouseMove, 0, maze, size));
          break;
        case 38:
          nextWhiteMouseMove(checkNextMove(whiteMouseMove, 1, maze, size));
          break;
        case 39:
          nextWhiteMouseMove(checkNextMove(whiteMouseMove, 2, maze, size));
          break;
        case 40:
          nextWhiteMouseMove(checkNextMove(whiteMouseMove, 3, maze, size));
          break;
      }
    }

    return () => {
      document.body.removeEventListener("keydown", keyHandler);
    };
  }, [maze, whiteMouseMove]);

  useEffect(() => {
    nextBlackMouseMove(nextBlackMove);
  }, [maze, nextBlackMove, tick]);

  return (
    <div className="App" id="App">
      <Game maze={maze}> </Game>
    </div>
  );
}

export default App;

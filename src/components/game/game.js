import Maze from "../maze/maze.js";
import "../maze/maze.css";
import Menu from "../menu/menu.js";
import "../menu/menu.css";
import { useState } from "react";
import { createMaze } from "../Util/createMaze.js";
import { useEffect } from "react";
import { createTimer } from "../Util/timer.js";
import checkNextMove from "../Util/checkNextMove";
import findSimplWay from "../Util/findSimplWay";


export default function Game(props) {

  const [size, setSize] = useState(props.size);
  const [maze, setMaze] = useState(undefined);
  const [whiteMouseMove, setWhiteMouseMove] = useState(0);
  const [blackMouseMove, setBlackMouseMove] = useState(size.row-1);
  const [lastWhiteMove, setLastWhiteMove] = useState(undefined);
  const [nextBlackMove, setNextBlackMove] = useState(undefined);
  const [time, setTime] = useState(undefined);
  const [tick, setTick] = useState(0);
  const [way, setWay] = useState(undefined);
  const [cheese, setCheese]=useState(size.row*size.column-(Math.round(size.row/2)))

  function createNewGame() {
    if (!maze) {
      let newMaze = createMaze(size);
      newMaze[0].whiteMouse = true;
      newMaze[blackMouseMove].blackMouse = true;
      newMaze[cheese].cheese = true;
      console.log("mouse!");
      setMaze(newMaze);
      let newWay = findSimplWay(blackMouseMove, cheese, newMaze, size);
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
  function keyHandler(e) {
    if (!time) {
      timer.startTimer(props.time);
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

  createNewGame();

  const timer = createTimer();

  timer.onTick = () => setNextBlackMove(() => way.pop());

  useEffect(() => {
    console.log(tick + "1");
    document.body.addEventListener("keydown", keyHandler);
    return () => {
      document.body.removeEventListener("keydown", keyHandler);
    };
  }, [maze, whiteMouseMove]);

  useEffect(() => {
    nextBlackMouseMove(nextBlackMove);
  }, [maze, nextBlackMove, tick]);

  return (
    <div className="game" >
      <Menu> menu</Menu> 
      <Maze maze={maze} size={size}> </Maze>{" "}
    </div>
  );
}

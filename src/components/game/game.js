import Maze from "../maze/maze.js";
import "../maze/maze.css";
import Menu from "../menu/menu.js";
import "../menu/menu.css";
import { useCallback, useRef, useState } from "react";
import { createMaze } from "../Util/createMaze.js";
import { useEffect } from "react";
import { createTimer } from "../Util/timer.js";
import checkNextMove from "../Util/checkNextMove";
import findSimplWay from "../Util/findSimplWay";
import { gameLogic } from "../Util/gameLogic.js";

export default function Game(props) {
  //console.log("render game");
  const [size, setSize] = useState(props.size);
  const [maze, setMaze] = useState(undefined);
  const [whiteMouseMove, setWhiteMouseMove] = useState(0);
  const [blackMouseMove, setBlackMouseMove] = useState(size.row - 1);
  const [lastWhiteMove, setLastWhiteMove] = useState(undefined);
  const [nextBlackMove, setNextBlackMove] = useState(undefined);
  const [time, setTime] = useState(undefined);
  const [tick, setTick] = useState(0);
  const [way, setWay] = useState(undefined);
  const [cheese, setCheese] = useState(
    size.row * size.column - Math.round(size.row / 2)
  );
  const [stopGame, setStopGame] = useState(false);
  function createNewGame() {
    if (!maze) {
      let newMaze = createMaze(size);
      newMaze[0].whiteMouse = true;
      newMaze[blackMouseMove].blackMouse = true;
      newMaze[cheese].cheese = true;
      console.log("mouse!");
      setMaze(newMaze);
      setMaze((maze)=>createHole(maze))
      let newWay = findSimplWay(blackMouseMove, cheese, newMaze, size);
      setWay(newWay);
    }
  }
  function createHole(maze) {
    let mazeWhisHole=maze
    let count = Math.round(maze.length / 25);
    let hole = [];
    while (count >= 0) {
      let random = Math.round(Math.random() * maze.length);
      if (random != 0 && size.row - 1&&hole.indexOf(random)<0) {
        hole.push(random);
        count--;
      }
    }
    let blackHole = hole.slice(0, hole.length / 2);
    let whiteHole = hole.slice( hole.length / 2, hole.length);
    blackHole.map((el) => {
      mazeWhisHole[el].blackHole = true;
    });
    whiteHole.map((el) => {
      mazeWhisHole[el].whiteHole = true;
    });
    console.log(hole)
    console.log(blackHole)
    console.log(whiteHole)
    return mazeWhisHole
  }
  function nextWhiteMouseMove(direction) {
    if (!time) {
      timer.current.startTimer(props.time);
      setTime(timer);
      console.log(way);
    }

    let index = checkNextMove(whiteMouseMove, direction, maze, size);
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
      setBlackMouseMove(index);
      setMaze(newMaze);
    }
  }

  function keyHandler(e) {
    switch (e.keyCode) {
      case 37:
        nextWhiteMouseMove(0);
        break;
      case 38:
        nextWhiteMouseMove(1);
        break;
      case 39:
        nextWhiteMouseMove(2);
        break;
      case 40:
        nextWhiteMouseMove(3);
        break;
    }
  }
  const qwer = useCallback(keyHandler, [nextWhiteMouseMove, checkNextMove]);
  /* function nextBlackMouseMove(index) {
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
      timer.current.startTimer(props.time);
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
  }*/
  function stop() {
    timer.current.resetTimer();
    setStopGame(true);
  }
  createNewGame();

  const timer = useRef(createTimer());

  timer.current.onTick = () => setNextBlackMove(() => way.pop());

  useEffect(() => {
    if (!stopGame) {
      document.body.addEventListener("keydown", qwer);
    }
    if (gameLogic(maze, whiteMouseMove)) {
      stop();
    }
    console.log(tick + "1");

    return () => {
      document.body.removeEventListener("keydown", qwer);
    };
  }, [maze, whiteMouseMove, stopGame]);

  useEffect(() => {
    nextBlackMouseMove(nextBlackMove);
    if (gameLogic(maze, blackMouseMove)) {
      stop();
    }
  }, [maze, nextBlackMove, tick, stopGame]);

  return (
    <div className="game">
      <Menu> menu</Menu>
      <Maze maze={maze} size={size}>
        {" "}
      </Maze>{" "}
    </div>
  );
}

import "./App.css";
import Game from "./components/game/game";
import "./components/game/game.css";
import { useState } from "react";
import { createMaze } from "./components/Util/createMaze.js";
import possibleMove from "./components/Util/possibleMove";
import { useEffect } from "react";
import { createTimer } from "./components/Util/timer.js";

function App() {
  const [size, setSize] = useState({ row: 20, column: 20 });
  //console.log(size);
  const [maze, setMaze] = useState(undefined);
  const [whiteMouseMove, setWhiteMouseMove] = useState(0);
  const [blackMouseMove, setBlackMouseMove] = useState(0);
  const [lastMove, setLastMove] = useState(undefined);

  function createNewGame() {
    if (!maze) {
      let newMaze = createMaze(size);
      newMaze[0].whiteMouse = true;
      newMaze[19].blackMouse = true;
      newMaze[390].cheese = true;
      console.log("mouse!");
      setMaze(newMaze);
    }
  }
  createNewGame();
  const timer = createTimer();
  timer.onTick = function (){
   console.log("hi");
 };
  console.log(timer);
  useEffect(() => {
    document.body.addEventListener("keydown", keyHandler);
    if (!timer.timerId) {
    timer.startTimer();
    }
    function keyHandler(e) {
      let possibMove = possibleMove(whiteMouseMove, size.column);
      console.log(possibMove);
      function checkBorder(step) {
        switch (step) {
          case 0:
            return maze[whiteMouseMove].borderLeft;
          case 1:
            return maze[whiteMouseMove].borderTop;
          case 2:
            return maze[whiteMouseMove].borderRight;
          case 3:
            return maze[whiteMouseMove].borderBottom;
        }
      }

      function findMove(posMove) {
        if (possibMove.length > 0) {
          for (let i = 0; i < possibMove.length; i++) {
            if (possibMove[i].move == posMove) {
              if (!checkBorder(possibMove[i].move)) {
                nextMove(possibMove[i].index);
              }
            }
          }
        }
      }
      switch (e.keyCode) {
        case 37:
          findMove(0);
          break;
        case 38:
          findMove(1);
          break;
        case 39:
          findMove(2);
          break;
        case 40:
          findMove(3);
          break;
      }
    }

    function nextMove(index) {
      let newMaze = maze;
      newMaze[whiteMouseMove].whiteMouse = false;
      newMaze[index].whiteMouse = true;
      setLastMove(whiteMouseMove);
      setWhiteMouseMove(index);
      setMaze(newMaze);
    }

    return () => {
      document.body.removeEventListener("keydown", keyHandler);
    };
  });

  useEffect(() => {});
  /*
useEffect(()=>{

  document.body.addEventListener("keydown", keyHandler);
  function keyHandler(e){
    console.log(e.keyCode)
  }
  return () => {
    document.body.removeEventListener("keydown", keyHandler);
  };
})*/

  //37 left; 38 top; 39 right; 40 down
  //console.log(maze);

  return (
    <div className="App" id="App">
      <Game maze={maze}> </Game>
    </div>
  );
}

export default App;

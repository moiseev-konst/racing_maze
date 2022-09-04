import "./App.css";
import Game from "./components/game/game";
import "./components/game/game.css";
import { useState } from "react";
import { createMaze } from "./components/Util/createMaze.js";
import possibleMove from "./components/Util/possibleMove";
import { useEffect } from "react";

function App() {
  const [size, setSize] = useState({ row: 20, column: 20 });
  //console.log(size);
  const [maze, setMaze] = useState(undefined);
  const [move, setMove] = useState(0);
  const [lastMove, setLastMove] = useState(undefined);

  function createNewGame() {
    if (!maze) {
      let newMaze = createMaze(size);
      newMaze[0].mouse = true;
      console.log("mouse!");
      setMaze(newMaze);
    }
  }
  createNewGame();


  useEffect(() => {
    document.body.addEventListener("keydown", keyHandler);

    function keyHandler(e) {
      let possibMove = possibleMove(move, size.column);
      console.log(possibMove);
      function checkBorder(step) {
        switch (step) {
          case 0:
            return maze[move].borderLeft;
          case 1:
            return maze[move].borderTop;
          case 2:
            return maze[move].borderRight;
          case 3:
            return maze[move].borderBottom;
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
      newMaze[move].mouse = false;
      newMaze[index].mouse = true;
      setLastMove(move);
      setMove(index);
      setMaze(newMaze);
    }

    return () => {
      document.body.removeEventListener("keydown", keyHandler);
    };
  });

  //37 left; 38 top; 39 right; 40 down
  //console.log(maze);

  return (
    <div className="App" id="App">
      <Game maze={maze}> </Game>
    </div>
  );
}

export default App;

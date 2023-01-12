import "./App.css";
import Game from "./components/game/game";
import "./components/game/game.css";
import { useState } from "react";
import { createMaze } from "./components/Util/createMaze.js";
import possibleMove from "./components/Util/possibleMove";
import { useEffect } from "react";
import { createTimer } from "./components/Util/timer.js";
import checkNextMove from "./components/Util/checkNextMove";
import findSimplWay from "./components/Util/findSimplWay";

function App() {
  const [size, setSize] = useState({ row: 20, column: 20 });
  //console.log(size);
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

  createNewGame();

  const timer = createTimer();
  /* function findWay(){
    //let newWay =findSimplWay(19,390,maze,size)
    setWay(()=>{findSimplWay(19,390,maze,size)})
    console.log(way)
  }*/
  timer.onTick = () => setNextBlackMove(() => way.pop())
  //timer.onTick = () => setTick((prev) => prev + 1);
  // setWay(()=>{findSimplWay(19,390,maze,size)})
  useEffect(() => {
    /* timer.onTick =(way)=> {
      console.log(way)
      if(way){
        let getNextIndex = way.pop();

        nextBlackMouseMove(getNextIndex);
      }
    
         // setWay(getNextIndex)
          }
  
    // timer.onTick = () => {};
    /* timer.onTick =()=> blackfuck(blackMouseMove);
    function blackfuck(blackMouseMove) {
      console.log(blackMouseMove);
      nextBlackMouseMove(
        checkNextMove(blackMouseMove, Math.round(Math.random() * 3), maze, size)
      );
    }*/
    console.log(tick + "1");
    document.body.addEventListener("keydown", keyHandler);
    function keyHandler(e) {
      if (!time) {
        // findWay()
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

      /*let possibMove = possibleMove(whiteMouseMove, size.column);
      console.log(possibMove);

      function checkMazeBorder(step) {
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
              if (!checkMazeBorder(possibMove[i].move)) {
                nextWhiteMouseMove(possibMove[i].index);
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
      }*/
      /*function checkNextMove(mouseMove, moveIndex) {
        
        let possiblMove = possibleMove(mouseMove, size.column);
        // console.log(possiblMove);

        function checkMazeBorder(step) {
          switch (step) {
            case 0:
              return maze[mouseMove].borderLeft;
            case 1:
              return maze[mouseMove].borderTop;
            case 2:
              return maze[mouseMove].borderRight;
            case 3:
              return maze[mouseMove].borderBottom;
          }
        }

        if (possiblMove.length > 0) {
          for (let i = 0; i < possiblMove.length; i++) {
            if (possiblMove[i].move == moveIndex) {
              if (!checkMazeBorder(possiblMove[i].move)) {
                return possiblMove[i].index;
              }
            }
          }
        }
      }*/
    }

    function nextBlackMouseMove(index) {
      if (index == 0 || index) {
        let newMaze = maze;
        newMaze[blackMouseMove].blackMouse = false;
        newMaze[index].blackMouse = true;
        setNextBlackMove(blackMouseMove);
        console.log(blackMouseMove);
        setBlackMouseMove(index);
        setMaze(newMaze);
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

    return () => {
      document.body.removeEventListener("keydown", keyHandler);
    };
  }, [maze, whiteMouseMove]);

  useEffect(() => {
   // let nextMove = way.pop();

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
    nextBlackMouseMove(
      nextBlackMove
      //checkNextMove(blackMouseMove, Math.round(Math.random() * 3), maze, size)
    );
    // console.log(tick + "2");
  }, [maze, nextBlackMove, tick]);
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

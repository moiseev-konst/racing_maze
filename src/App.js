import "./App.css";
//import Maze from "./components/maze/maze";
//import "./components/maze/maze.css";
import Game from "./components/game/game";
import "./components/game/game.css";
import { useState } from "react";
import { createMaze } from "./components/Util/createMaze.js";

function App() {
  const [size, setSize] = useState({ row: 20, column: 20 });
  const [maze, setMaze] = useState(createMaze(size));
  //setSize({ row: 15, column: 15 });
  // setMaze();
  //console.log(size);
  //console.log(maze);
  return (
    <div className="App">
      <Game maze={maze}></Game>
      
    </div>
  );
}

export default App;

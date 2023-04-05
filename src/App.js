import "./App.css";
import Game from "./components/game/game";
import "./components/game/game.css";
/*import { useState } from "react";
import { createMaze } from "./components/Util/createMaze.js";
import { useEffect } from "react";
import { createTimer } from "./components/Util/timer.js";
import checkNextMove from "./components/Util/checkNextMove";
import findSimplWay from "./components/Util/findSimplWay";*/

function App() {
  console.log('render app')
  return (
    <div className="App" id="App">
      <Game /*maze={maze}*/ size= {{ row: 15, column: 15}} time={300}> </Game>
    </div>
  );
}

export default App;

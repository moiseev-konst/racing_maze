import "./App.css";
import Game from "./components/game/game";
import "./components/game/game.css";
import { useState } from "react";
import { createMaze } from "./components/Util/createMaze.js";

function App() {
  const [size, setSize] = useState({ row: 20, column: 20 });
  console.log("size")
  const [maze, setMaze] = useState(createMaze(size));
  
  //const test = document.querySelector("body");
  //console.log(test)
  //test.addEventListener('keyDown', keyHandler)
  document.body.addEventListener('keyup', e=>keyHandler(e));
  function keyHandler (e){
       console.log(e)
  }
   return (
    <div className="App"  id="App">
      <Game maze={maze}></Game>
      
    </div>
  );
}

export default App;

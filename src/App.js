import "./App.css";
import Maze from "./components/maze/maze";
//import "./components/maze/maze.css";
import Game from "./components/game/game";
import "./components/game/game.css";

function App() {
  return (
    <div className="App">
      <Game>
        game
        <Maze/>
      </Game>
      
    </div>
  );
}

export default App;

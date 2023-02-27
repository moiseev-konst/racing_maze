import Maze from "../maze/maze.js";
import "../maze/maze.css";
import Menu from "../menu/menu.js";
import "../menu/menu.css";


export default function Game(props) {
  return (
    <div className="game">
      <Menu> menu</Menu> 
      <Maze maze={props.maze}> </Maze>{" "}
    </div>
  );
}

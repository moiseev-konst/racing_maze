import Maze from "../maze/maze.js";
import "../maze/maze.css";

export default function Game(props) {
  //console.log(props.maze);
  return (
    <div className="game">
      game
      <Maze maze={props.maze}></Maze>
    </div>
  );
}

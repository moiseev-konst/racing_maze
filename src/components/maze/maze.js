import Cell from "../Cell/cell";
import "../Cell/cell.css";

export default function Maze(props) {
  console.log(props.maze);

  const arrCell = (maze) => {
    return maze.map((cell) => (
      <Cell id={cell.id} key={cell.id} borderCell={cell} />
    ));
  };
  return <div className="maze"> {arrCell(props.maze)} </div>;
}

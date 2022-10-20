import Cell from "../Cell/cell";
import "../Cell/cell.css";

export default function Maze(props) {
 
  const arrCell = (maze) => {
    return maze.map((cell) => (
      <Cell id={cell.id} key={cell.id} borderCell={cell} whiteMouse={cell.whiteMouse} blackMouse={cell.blackMouse} cheese={cell.cheese}/>
    ));
  };
  return <div className="maze"> {arrCell(props.maze)} </div>;
}

import Cell from "../Cell/cell";
import "../Cell/cell.css";

export default function Maze(props) {
 // console.log('render maze')
 const mazeGrid={
  gridTemplateColumns:`repeat(${props.size.column}, 1fr)`,
  gridTemplateRows:`repeat(${props.size.row}, 1fr)`
 }
  const arrCell = (maze) => {
    return maze.map((cell) => (
      <Cell id={cell.id} key={cell.id} borderCell={cell} whiteMouse={cell.whiteMouse} blackMouse={cell.blackMouse} cheese={cell.cheese} blackHole={cell.blackHole}
      whiteHole={cell.whiteHole}/>
    ));
  };
  return <div className="maze" style={mazeGrid}> {arrCell(props.maze)} </div>;
}

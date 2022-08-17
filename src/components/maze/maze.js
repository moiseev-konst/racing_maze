import Cell from "../Cell/cell";
import "../Cell/cell.css";

export default function Maze(props) {
  console.log(props.maze);

  const arrCell = (maze) => {
    return maze.map((cell) => <Cell id={cell.id} key={cell.id} />);
    // let cells=[]
    //for (let i = 0; i < 225; i++) {
    //      cells.push(<Cell id={i.toString()}/>)
  };

  //return cells

  return <div className="maze">{arrCell(props.maze)}</div>;
}

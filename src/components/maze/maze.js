import Cell from "../Cell/cell";
import "../Cell/cell.css";

export default function Maze(props) {
  const arrCell = () => {
    let cells=[]
    for (let i = 0; i < 225; i++) {
            cells.push(<Cell id={i.toString()}/>)
    }
return cells
  };
  return (
    <div className="maze">
      {arrCell()}
     
    </div>
  );
}

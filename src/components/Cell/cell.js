export default function Cell(props) {
  //console.log(props)
  let left = props.borderCell.borderLeft ? " borderLeft " : "";
  let bottom = props.borderCell.borderBottom ? " borderBottom " : "";
  let right = props.borderCell.borderRight ? " borderRight " : "";
  let top = props.borderCell.borderTop ? " borderTop " : "";
  let mouse = props.mouse ? " mouse " : "";

  const cellBorderCss = (cell) => {
    let left = cell.borderLeft ? " border-left: 2px solid black; " : "";
    let bottom = cell.borderBottom ? " border-bottom: 2px solid black; " : "";
    let right = cell.borderRight ? " border-right: 2px solid black; " : "";
    let top = cell.borderTop ? " border-top: 2px solid black; " : "";
    console.log(left + bottom + right + top);
    return left + bottom + right + top;
  };
  return (
    <div className={"cell" + left + bottom + right + top + mouse} id={props.id}>
      <p> {props.id} </p>{" "}
    </div>
  );
}

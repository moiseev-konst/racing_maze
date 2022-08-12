export default function Cell(props) {
  return (
    <div className="cell" id={props.id}>
      <p>{props.id}</p>
    </div>
  );
}

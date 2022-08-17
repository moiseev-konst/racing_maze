export function createMaze(size) {
  let row = size.row;
  let column = size.column;
  let maze = [];
  for (let i = 0; i < row * column; i++) {
    maze.push({
      id: i.toString(),
      borderLeft: null,
      borderTop: null,
      borderBottom: null,
      borderRight: null,
      mouse: null,
      blackHole: null,
      whiteHole: null,
    });
    
  }
  return maze;
}

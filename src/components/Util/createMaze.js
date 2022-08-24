import {
  convertIndexToCoordinates,
  convertCoordinatesToIndex,
} from "./parser.js";

export function createMaze(size) {
  let row = size.row;
  let column = size.column;
  let maze = [];
  const modelMaze = [];
  const arrCheckCell = Array(225);
  for (let i = 0; i < arrCheckCell.length; i++) {
    arrCheckCell[i] = i;
  }

  let coordinateSurroundingElements = [
    { x: -1, y: 0 }, //left
    { x: 0, y: -1 }, //top
    { x: 1, y: 0 }, //right
    { x: 0, y: 1 }, //bottom
  ];

  for (let i = 0; i < row * column; i++) {
    maze.push({
      id: i.toString(),
      borderLeft: true,
      borderTop: true,
      borderBottom: true,
      borderRight: true,
      mouse: null,
      blackHole: null,
      whiteHole: null,
    });
  }

  function getRandomSide() {
    return Math.round(Math.random() * 3);
  }

  function checkBorders(coordinateCell) {
    const outsideTop = coordinateCell.row >= 0;
    const outsideLeft = coordinateCell.column >= 0;
    const outsideBottom = coordinateCell.row < row;
    const outsideRight = coordinateCell.column < column;

    return outsideTop && outsideLeft && outsideBottom && outsideRight;
  }

  function isPossibleCell(coordinateCell) {
    const possibleCell = coordinateSurroundingElements
      .map((coord) => {
        return {
          row: coordinateCell.row + coord.y,
          column: coordinateCell.column + coord.x,
          move: coordinateSurroundingElements.indexOf(coord),
          index: convertCoordinatesToIndex(
            {
              row: coordinateCell.row + coord.y,
              column: coordinateCell.column + coord.x,
            },
            size
          ),
        };
      })
      .filter((obj) => {
        return checkBorders(obj) && arrCheckCell[obj.index];
      });
    return possibleCell;
  }

  function nextMove(index) {
    let coordinateCell = convertIndexToCoordinates(index, size);
    let possibleNextCell = isPossibleCell(coordinateCell);
    let randMove =
      possibleNextCell.length > 0
        ? possibleNextCell[
            Math.round(Math.random() * (possibleNextCell.length - 1))
          ]
        : undefined;

    return randMove;
  }

  const firstCell = Math.round(Math.random() * 225);
 function breakWall(index, nextIndex){
    switch (nextIndex.move) {
        case 0:
          maze[index].borderLeft = false;
          maze[nextIndex.index].borderRight = false;
          break;
        case 1:
          maze[index].borderTop = false;
          maze[nextIndex.index].borderBottom = false;
          break;
        case 2:
          maze[index].borderRight = false;
          maze[nextIndex.index].borderLeft = false;
          break;
        case 3:
          maze[index].borderBottom = false;
          maze[nextIndex.index].borderTop = false;
          break;
      }
 }
  function createMazeLine(index) {
    const line = [];
    let nextIndex;
    while (arrCheckCell[index]) {
      arrCheckCell[index] = 0;
      line.push(index);
      nextIndex = nextMove(index);
      if (!nextIndex) {
        return line;
      }
      breakWall(index,nextIndex)
    
      index = nextIndex.index;
    }
  }

  function nextIndex() {
    for (let i = 0; i < arrCheckCell.length; i++) {
      if (arrCheckCell[i]) {
        return i;
      }
    }
  }
  function nextIndexMain(index, count) {
    arrCheckCell[index] = index;
    return modelMaze[0][count];
  }

  function createModelMaze() {
    let count = 0;
    let index;
    modelMaze.push(createMazeLine(firstCell));

    index = nextIndexMain(modelMaze[0][count], count);

    while (index || index == "0") {
      count++;
      let line = createMazeLine(index);
      if (line.length > 1) {
        modelMaze.push(line);
      }
      count < modelMaze[0].length
        ? (index = nextIndexMain(modelMaze[0][count], count))
        : (index = nextIndex());
    }
  }

  createModelMaze();
  /*modelMaze.forEach((line)=>{
    let randomCell=Math.round(Math.random() *line.length)
    maze[randomCell].borderLeft = false;
    maze[randomCell].borderRight= false
    maze[randomCell].borderTop = false;
    maze[randomCell].borderBottom= false
    })*/
  console.log(modelMaze);
  console.log(maze);
  return maze;
}

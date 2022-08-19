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
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
  ];

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

  function getRandomSide() {
    return Math.round(Math.random() * 4);
  }

 /* function checkCell(index) {
    if (arrCheckCell[index]) {
      arrCheckCell[index] = 0;
      return index;
    }
  }*/

  function checkBorders(coordinateCell) {
    
    const outsideTop = coordinateCell.row >= 0;
    const outsideLeft = coordinateCell.column >=0;
    const outsideBottom = coordinateCell.row < row ;
    const outsideRight = coordinateCell.column <column;

    return outsideTop && outsideLeft && outsideBottom && outsideRight;
  }

  function move(index) {
    let side = getRandomSide();
    let moveIndex
    let coordinateCell = convertIndexToCoordinates(index, size);
    let coordinateNextCell = {
      row: coordinateCell.row + coordinateSurroundingElements[side].y,
      column: coordinateCell.column + coordinateSurroundingElements[side].x,
    };
    if(checkBorders(coordinateNextCell)){
        moveIndex = convertCoordinatesToIndex(coordinateNextCell,size);
    }
    
    return moveIndex;
  }

  const firstCell = Math.round(Math.random() * 225);

  function createMazeLine(index) {
    const line = [];
    let nextIndex;
    while (arrCheckCell[index]) {
        arrCheckCell[index]=0  
      line.push(index);
      nextIndex = move(index);
      while (!nextIndex||nextIndex===line[line.length-2]) {
        nextIndex = move(index);
      }
      index=nextIndex
    }
    return line;
  }
  function nextIndex() {
    for (let i = 0; i < arrCheckCell.length; i++) {
      if (arrCheckCell[i]) {
        return i;
      }
    }
  }

  function createModelMaze() {
    modelMaze.push(createMazeLine(firstCell));
    let index = nextIndex();
    while (index||index=='0') {
      modelMaze.push(createMazeLine(index));
      index = nextIndex();
    }
  }
  
createModelMaze()
console.log(modelMaze)
  return maze;
}

import {
  convertIndexToCoordinates,
  convertCoordinatesToIndex,
} from "./converters.js";

const coordinateSurroundingElements = [
  { x: -1, y: 0 }, //left
  { x: 0, y: -1 }, //top
  { x: 1, y: 0 }, //right
  { x: 0, y: 1 }, //bottom
];

export default function possibleMove(index, numbOfColum) {
  function checkBorders(coordinateCell) {
    const outsideTop = coordinateCell.row >= 0;
    const outsideLeft = coordinateCell.column >= 0;
    const outsideBottom = coordinateCell.row < numbOfColum;
    const outsideRight = coordinateCell.column < numbOfColum;
    return outsideTop && outsideLeft && outsideBottom && outsideRight;
  }

  let coordinateCell = convertIndexToCoordinates(index, numbOfColum);

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
          numbOfColum
        ),
      };
    })
    .filter((obj) => {
      return checkBorders(obj);
    });
  return possibleCell;
}

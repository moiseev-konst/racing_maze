export default function parseIndexToCoordinates(index) {
    let row = Number.parseInt(index / this.column);
    let column = indexobj.index - row * indexObj.column;
    return { row, column, index };
}

export default function parseCoordinatesToIndex(coordinateObject) {
    return coordinateObject.row * this.gameSize.column + coordinateObject.column;
}
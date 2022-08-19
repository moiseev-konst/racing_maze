 function convertIndexToCoordinates(index, size) {
    let row = Number.parseInt(index / size.column);
    let column = index - row * size.column;
    return { row, column, index };
}

 function convertCoordinatesToIndex(coordinate,size) {
    return coordinate.row * size.column +  coordinate.column;
}

export {convertCoordinatesToIndex, convertIndexToCoordinates}
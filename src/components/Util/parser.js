 function convertIndexToCoordinates(index, size) {
    let row = Number.parseInt(index / size.column);
    let column = index.index - row * index.column;
    return { row, column, index };
}

 function convertCoordinatesToIndex(coordinate) {
    return coordinate.row * coordinate.size +  coordinate.column;
}

export {convertCoordinatesToIndex, convertIndexToCoordinates}
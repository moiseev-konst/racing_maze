 function convertIndexToCoordinates(index, numOfColum) {
    let row = Number.parseInt(index / numOfColum);
    let column = index - row * numOfColum;
    return { row, column, index };
}

 function convertCoordinatesToIndex(coordinate,numOfColum) {
    return coordinate.row * numOfColum +  coordinate.column;
}

export {convertCoordinatesToIndex, convertIndexToCoordinates}
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
        return Math.round(Math.random() * 3);
    }

    function checkBorders(coordinateCell) {

        const outsideTop = coordinateCell.row >= 0;
        const outsideLeft = coordinateCell.column >= 0;
        const outsideBottom = coordinateCell.row < row;
        const outsideRight = coordinateCell.column < column;

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
        if (checkBorders(coordinateNextCell)) {
            moveIndex = convertCoordinatesToIndex(coordinateNextCell, size);
        }
        return moveIndex;
    }

    function nextMove(index) {
        let coordinateCell = convertIndexToCoordinates(index, size);
        const possibleNextCell = coordinateSurroundingElements.map((coord) => {
            return {
                row: coordinateCell.row + coord.y,
                column: coordinateCell.column + coord.x,
                move: coordinateSurroundingElements.indexOf(coord),
                index: convertCoordinatesToIndex({
                    row: coordinateCell.row + coord.y,
                    column: coordinateCell.column + coord.x,
                }, size)
            }
        }).filter((obj) => {
            return checkBorders(obj) && arrCheckCell[obj.index]
        })

        let randMove = possibleNextCell[Math.round(Math.random() * (possibleNextCell.length - 1))] ? possibleNextCell[Math.round(Math.random() * (possibleNextCell.length - 1))].index : undefined

        function vert(cellObj) {
            cellObj.borderLeft = true
            cellObj.borderRight = true
        }

        function hor(cellObj) {
            cellObj.borderTop = true
            cellObj.borderBottom = true
        }
        if (randMove) {
            randMove.move % 2 === 0 ? hor(maze[index]) : vert(maze[index])
        }
        return randMove
    }


    const firstCell = Math.round(Math.random() * 225);

    function createMazeLine(index) {
        const line = [];
        let nextIndex;
        while (arrCheckCell[index]) {
            arrCheckCell[index] = 0
            line.push(index);
            nextIndex = nextMove(index);
            if (!nextIndex) {
                return line
            }
            index = nextIndex
        }
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
        //let index =nextMove(modelMaze[Math.round(Math.random() * (modelMaze[0].length - 1))][Math.round(Math.random() * (modelMaze[0].length - 1))])
        let index = nextIndex()
        while (index || index == '0') {
            modelMaze.push(createMazeLine(index));
            index = nextIndex();
        }
    }

    createModelMaze()
    console.log(modelMaze)
    return maze;
}
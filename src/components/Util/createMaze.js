import possibleMove from "./possibleMove";

export function createMaze(param) {
    const row = param.row;
    const column = param.column;
    const size = row * column;
    let maze = [];
    let mainLine;
    const firstCell = getRandomNum(size);

    const modelMaze = [];
    const arrCheckCell = [];

    (() => {
        for (let i = 0; i < size; i++) {
            arrCheckCell.push(i);
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
    })();

    function getRandomNum(amidNum) {
        return Math.round(Math.random() * amidNum);
    }

    function nextMove(index) {
        let possibleNextCell = possibleMove(index, column).filter((el) => {
            return arrCheckCell[el.index];
        });
        let randMove =
            possibleNextCell.length > 0 ?
            possibleNextCell[getRandomNum(possibleNextCell.length - 1)] :
            undefined;
        return randMove;
    }

    function breakWall(index, nextIndex) {
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
            breakWall(index, nextIndex);
            index = nextIndex.index;
        }
    }

    function createModelMaze() {
        let count = 0;
        let index;

        function startInOrder() {
            for (let i = 0; i < arrCheckCell.length; i++) {
                if (arrCheckCell[i]) {
                    return i;
                }
            }
        }

        function startInFirstLine(index, count) {
            arrCheckCell[index] = index;
            return modelMaze[0][count];
        }

        modelMaze.push(createMazeLine(firstCell));
        index = startInFirstLine(modelMaze[0][count], count);
        while (index || index == "0") {
            count++;
            let line = createMazeLine(index);
            if (line.length > 1) {
                modelMaze.push(line);
            }
            count < modelMaze[0].length ?
                (index = startInFirstLine(modelMaze[0][count], count)) :
                (index = startInOrder());
        }
    }

    function connectAdjacentLine() {

        function searchIndexInModel(index) {
            for (let i = 0; i < modelMaze.length; i++) {
                if (modelMaze[i].indexOf(index) > 0) {
                    return i;
                }
            }
        }

        let mainLine = modelMaze[0];
        modelMaze.forEach((line) => {
            line.forEach((cell) => {
                let possible = possibleMove(cell, column).filter((el) => {
                    return mainLine.indexOf(el.index) < 0;
                });
                if (possible.length > 0) {
                    possible.forEach((pos) => {
                        let modelIndex = searchIndexInModel(pos.index);
                        mainLine = modelIndex ? [...mainLine, ...modelMaze[modelIndex]] : [...mainLine, pos.index];
                        breakWall(cell, pos);
                    });
                }
            });
        });
    }

    createModelMaze();
    connectAdjacentLine();
    console.log(mainLine);
    console.log(modelMaze);
    console.log(maze);
    return maze;
}
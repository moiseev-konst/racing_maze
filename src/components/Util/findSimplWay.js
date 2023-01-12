import possibleMove from "./possibleMove";
import checkMazeBorder from "./checkMazeBorder";

export default function findSimplWay(
    mousePosition,
    cheesePosition,
    maze,
    size
) {
    const arrModelMaze = Array(maze.length).fill(null);
    arrModelMaze[mousePosition] = 0;
    arrModelMaze[cheesePosition] = -1;
       const way = [];
    let stepIteration = 1;
       let end = false

    function findWay(mousePosition) {
        let frontWave = [mousePosition];
        let arr = [];

        function recordStep(cells) {
            let posMove = possibleMove(cells, size.column);

            let check = posMove.filter((el) => {
                return arrModelMaze[el.index] === null || arrModelMaze[el.index] === -1
            });

            let filterCells = check.filter((el) => {
                return !checkMazeBorder(el.move, maze, cells);
            });

            filterCells.forEach((el) => {
                if (arrModelMaze[el.index] !== -1) {
                    arrModelMaze[el.index] = stepIteration;
                    arr.push(el.index);

                } else {
                    arrModelMaze[el.index] = stepIteration;
                    end = true
                    recordWay(el.index)
                }
            });
        }

        function recordWay(cells) {
            let indexCell = cells
            let orderNumber = arrModelMaze[indexCell]
            while (orderNumber > 0) {
                let suroundCells = possibleMove(indexCell, size.column).filter((el) => {
                    return !checkMazeBorder(el.move, maze, indexCell)
                }).map((el) => { return el.index })
                let filterCell = suroundCells.filter((el) => { return arrModelMaze[el] < arrModelMaze[indexCell] && arrModelMaze[el] !== null })
                way.push(indexCell)
                indexCell = filterCell.pop()
                orderNumber = arrModelMaze[indexCell]
                console.log(orderNumber)
            }
            console.log(way)
        }

        let it = 0
        while (!end) {
            if (it > 500) {
                break
            }
            frontWave.forEach((el) => { recordStep(el) })
            frontWave = arr
            arr = []
            stepIteration = stepIteration + 1;
            console.log('Start');
            it++

        }

        console.log('End');

    }

    findWay(mousePosition);
    console.log(arrModelMaze);
      console.log(way);

    return way;
}
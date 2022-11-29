import possibleMove from "./possibleMove"
import checkMazeBorder from "./checkMazeBorder";

export default function findSimplWay(mousePosition, cheesePosition, maze, size) {
    const arrModelMaze = Array(maze.length).fill(0)
    arrModelMaze[mousePosition] = 1
    arrModelMaze[cheesePosition] = -1
    let memoryArr = []
    const way = []
    let stepIteration = 1;
    memoryArr.push(mousePosition)

    function checkCells(index) {
        return arrModelMaze[index]
    }

    function filterPosiblMove(position) {

    }

    function findWay(memoryArr) {

        for (let i = 0; i < memoryArr.length; i++) {

            let posMove = possibleMove(memoryArr[i], size.column)
            let check = posMove.filter((el) => { return !checkCells(el.index) })
            let filterCells = check.filter((el) => {
                return !checkMazeBorder(el.move, maze, el.index)
            })
            memoryArr = [...memoryArr, ...filterCells]
            console.log(posMove)
            console.log(check)
            console.log(filterCells)
        }



        /* filterCells.forEach((el) => {
             memoryArr.push(el.index)
             arrModelMaze[el.index] = stepIteration + 1

         })*/

        stepIteration = stepIteration + 1




    }
    findWay(mousePosition)
    console.log(arrModelMaze)
    console.log(memoryArr)
    console.log(way)




    return way

}
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
  let memoryArr = [];
  const way = [];
  let stepIteration = 1;
  memoryArr.push(mousePosition);

  function checkCells(index) {
    return arrModelMaze[index];
  }

  //function filterPosiblMove(position) {}

  function findWay(mousePosition) {
    let frontWave = [mousePosition];

    let arr = [];

    function isEnd(arr) {
      return arr.some((el) => {
       
        return arrModelMaze[el] !== -1;
      });
    }

    function recordStep(cells) {
      let posMove = possibleMove(cells, size.column);

      let check = posMove.filter((el) => {
      return arrModelMaze[el.index]!==0&&arrModelMaze[el.index]===null
        // return !checkCells(el.index);
      });

      let filterCells = check.filter((el) => {
        return !checkMazeBorder(el.move, maze, cells);
      });

      filterCells.forEach((el) => {
        arrModelMaze[el.index] = stepIteration;
        arr.push(el.index);
      });
    }
let it=0
    while (isEnd(frontWave)) {
        frontWave.forEach((el)=>{recordStep(el)})
        frontWave=arr
        arr=[]
        stepIteration = stepIteration + 1;
        console.log('Start');
        it++
        if(it>500){
            break
        }
    }
    console.log('End');
    console.log(frontWave);
    }

    /* 
    for (let i = 0; i < frontWave.length; i++) {
      memoryArr = [...memoryArr, ...filterCells];
      console.log(posMove);
      console.log(check);
      console.log(filterCells);
    }

    filterCells.forEach((el) => {
             memoryArr.push(el.index)
             arrModelMaze[el.index] = stepIteration + 1

         })*/

    
  
  findWay(mousePosition);
  console.log(arrModelMaze);
  console.log(memoryArr);
  console.log(way);

  return way;
}

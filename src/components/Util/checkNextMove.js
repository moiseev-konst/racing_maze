import possibleMove from "./possibleMove"
import checkMazeBorder from "./checkMazeBorder";

export default function checkNextMove(mouseMove, moveIndex, maze, size) {

    let possiblMove = possibleMove(mouseMove, size.column);
    // console.log(possiblMove);

    /*function checkMazeBorder(step) {
        switch (step) {
            case 0:
                return maze[mouseMove].borderLeft;
            case 1:
                return maze[mouseMove].borderTop;
            case 2:
                return maze[mouseMove].borderRight;
            case 3:
                return maze[mouseMove].borderBottom;
        }
    }*/

    if (possiblMove.length > 0) {
        for (let i = 0; i < possiblMove.length; i++) {
            if (possiblMove[i].move == moveIndex) {
                if (!checkMazeBorder(possiblMove[i].move, maze, mouseMove)) {

                    return possiblMove[i].index;
                }
            }
        }
    }
}
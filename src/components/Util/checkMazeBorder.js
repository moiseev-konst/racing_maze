export default function checkMazeBorder(step, maze, move) {
    switch (step) {
        case 0:
            return maze[move].borderLeft;
        case 1:
            return maze[move].borderTop;
        case 2:
            return maze[move].borderRight;
        case 3:
            return maze[move].borderBottom;
    }
}
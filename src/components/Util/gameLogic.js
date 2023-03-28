export function gameLogic(maze, checkMove) {
  if (maze[checkMove].whiteMouse && maze[checkMove].cheese) {
    console.log("white win");
    return checkMove
  }
  if (maze[checkMove].blackMouse && maze[checkMove].cheese) {
    console.log("Black win");
    return checkMove
  }
}

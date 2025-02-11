const Gameboard = (function(){

  //create a 3 x 3 grid that will show up as an array
  const board = [];
  const rows = 3;
  const cols = 3;

  //create for loop to make the array items for board (which will function as rows). each board item will have an inner array
  //nest another for loop so every time a row is created, create three inner items for it (which will be the columns)
  for (i = 0; i < rows; i++){
    board[i] = [];

    for (j = 0; j < cols; j++){
      //* is used for empty cell !!! will replace with Mark()
      board[i].push("*");
    }
  }
  return {board};
})();

//getting the value of cells, finding out what mark each cell has
function Mark(){
  let value = "*";

}

//playing the game - user input
function gameController(){

  const board = Gameboard.board;

  //place mark on specified cell
  const placeMark = (player, row, column) =>{

    //go to board array item specified by "row" and replace inner item at index "column" with "player"
    board[row].splice(column, 1, player);

    //brings up updated board
    console.log(game.board);
  }

  return {board, placeMark}
}

const game = gameController();
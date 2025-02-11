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

  //print board in console so i dont have to keep opening the array
  //!!! delete once ui is made
  const printBoard = () =>{
    for (let i = 0; i < board.length; i++){
      console.dir(board[i].join("  "));
    }
  }

  return {board, printBoard};
})();

//playing the game - user input
const game = (() =>{

  //make players 1 and 2
  function createPlayers(name, mark){

    return {name, mark}
  }

  const player1 = createPlayers("player1", "X");
  const player2 = createPlayers("player2", "O");

  const player1Mark = player1.mark;
  const player2Mark = player2.mark;

  const board = Gameboard.board;
  const printBoard = Gameboard.printBoard

  //print board on startup
  printBoard();

  //place mark on specified cell
  const placeMark = (player, row, column) =>{

    //go to board array item specified by "row" and replace inner item at index "column" with "player"
    board[row].splice(column, 1, player);

    //brings up updated board
    printBoard();
  }

  return {board, printBoard, placeMark, player1Mark, player2Mark}
})();


// play by entering :
// game.placeMark(playermark, row, column)
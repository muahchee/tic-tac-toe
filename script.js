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
      console.log(board[i].join("  "));
    }
    console.log("syntax: game.placeMark(row, column)")
  }

  return {board, printBoard};
})();

const Players = (() =>{
  //make players 1 and 2
  function createPlayers(name){
    let mark;

    if (name == "player1"){
      mark = "X";
    } else if (name == "player2"){
      mark = "O";
    }

    //to prevent player from changing the mark
    const getMark = () => mark;

    return {name, getMark}
  }

  const player1 = createPlayers("player1");
  const player2 = createPlayers("player2");

  return{ player1, player2 }
})()

//playing the game - user input
const Game = (() =>{

  const player1 = Players.player1;
  const player2 = Players.player2;
  
  const board = Gameboard.board;
  const printBoard = Gameboard.printBoard

  let turnOrder = 1;
  const nextTurn = () => turnOrder++;

  //print board on startup
  printBoard();
  console.log("Player 1's turn!")

  //place mark on specified cell
  const placeMark = (row, column) =>{

    let playermark;

    // if turnOrder is even, it's player2's turn. player1 if its odd
    if (turnOrder % 2 == 0){
      playermark = player2.getMark();
      console.log(`Player 2's turn!`);
    } else{
      playermark = player1.getMark();
      console.log(`Player 1's turn!`);
    }

    //go to board array item specified by "row" and replace inner item at index "column" with "player"
    board[row].splice(column, 1, playermark);

    nextTurn();
    
    //brings up updated board
    printBoard();
  }

  return {board, printBoard, placeMark, player1, player2}
})();


// play by entering :
// game.placeMark(playermark, row, column)
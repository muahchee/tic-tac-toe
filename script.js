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

    let winStatus = false;

    const winner = () => winStatus = true;

    //to prevent player from changing info
    const getMark = () => mark;
    const getName = () => name;
    const getWinStatus = () => winStatus;

    return {getName, getMark, getWinStatus, winner}
  }

  const player1 = createPlayers("player1");
  const player2 = createPlayers("player2");

  return{ player1, player2 }
})()

const CheckWin = (() =>{
  const board = Gameboard.board;

  let player1Win = Players.player1.getWinStatus();
  let player2Win = Players.player2.getWinStatus();

  //--Check for horizontal win (three matches in a row)--
  const checkRowWin = () =>{

    //function to check if the current value is X or O
    const rowAllX = (current) => current ==="X";
    const rowAllO = (current) => current ==="O";

    for (let i = 0; i < board.length; i++){
      //checks if all items(column) in the array(row) is an X
      if (board[i].every(rowAllX)) {Players.player1.winner(); 
        player1Win = Players.player1.getWinStatus();
        break;}

      //checks if all items(column) in the array(row) is an O
      if (board[i].every(rowAllO)) {Players.player2.winner(); 
        player2Win = Players.player2.getWinStatus();
        break;}
    }
    
  }

  return {player1Win, player2Win, checkRowWin}

})()


//playing the game - user input
const Game = (() =>{

  const player1 = Players.player1;
  const player2 = Players.player2;
  
  const board = Gameboard.board;
  const printBoard = Gameboard.printBoard

  let turnOrder = 1;
  const nextTurn = () => turnOrder++;

  const checkRowWin = CheckWin.checkRowWin;


  //print board on startup
  printBoard();
  console.log("Player 1's turn!")

  //place mark on specified cell
  const placeMark = (row, column) =>{

    let playermark;

    //Check if move is legal. Make sure the space isn't populated with opponent's mark. Also prevent out of bounds.
    if (board[row][column] == "*" && row <=2 && column <= 2){

      // Taking turns. if turnOrder is even, it's player2's turn. player1 if its odd
      if (turnOrder % 2 == 0){
        playermark = player2.getMark();
      } else{
        playermark = player1.getMark();
      }

      //Placing the Mark. go to board array item specified by "row" and replace inner item at index "column" with "player"
      board[row].splice(column, 1, playermark);

      //check if win condition is met
      checkRowWin();
      if (player1.getWinStatus()  === true) {
        console.log("Player 1 wins!")
      } else if (player2.getWinStatus() === true) {
        console.log("Player 2 wins!");
      }

      //add to turnOrder counter
      nextTurn();
      
      //brings up updated board
      printBoard();
      if (turnOrder % 2 == 0){
        console.log("Player 2's turn!");
      } else{
        console.log("Player 1's turn!");
      }

    } else {
      //illegal move message
      console.log("Please input values 0-2 for the row and column.")
      console.log("You're not allowed to overwrite your opponent's mark!")

      printBoard();
      if (turnOrder % 2 == 0){
        console.log("Still Player 2's turn!");
      } else{
        console.log("Still Player 1's turn!");
      }
    };

  }

  return {placeMark}
})();

Game.placeMark(2,1)
Game.placeMark(1,1)
Game.placeMark(2,0)
Game.placeMark(0,0)
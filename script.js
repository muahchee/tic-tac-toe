const Gameboard = (function(){

  //create a 3 x 3 grid that will show up as an array
  const board = [];
  const rows = 3;
  const cols = 3;

  //create for loop to make the array items for board (which will function as rows). each board item will have an inner array
  //nest another for loop so every time a row is created, create three inner items for it (which will be the columns)
  const newBoard = () => {
    for (i = 0; i < rows; i++){
      board[i] = [];

      for (j = 0; j < cols; j++){
        //* is used for empty cell !!! will replace with Mark()
        board[i].push("*");
      }
    }
  }

  newBoard();

  //print board in console so i dont have to keep opening the array
  //!!! delete once ui is made
  const printBoard = () =>{
    for (let i = 0; i < board.length; i++){
      console.log(board[i].join("  "));
    }
    console.log("syntax: game.placeMark(row, column)")
  }

  return {board, printBoard, newBoard};
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
    const resetWinner = () => winStatus = false;

    //to prevent player from changing info
    const getMark = () => mark;
    const getName = () => name;
    const getWinStatus = () => winStatus;

    return {getName, getMark, getWinStatus, winner, resetWinner}
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
        //get new updated status
        player1Win = Players.player1.getWinStatus();
        break;}

      //checks if all items(column) in the array(row) is an O
      if (board[i].every(rowAllO)) {Players.player2.winner(); 
        //get new updated status
        player2Win = Players.player2.getWinStatus();
        break;}
    }
  }
  //--Check for vertical win --
  const checkColWin = () =>{
    const indexArrX = [];
    const indexArrO = [];

    //push indexes of every instance of each mark into respective arrays. if there are three occurances of the same index, that means a column victory!
    for(let i = 0; i < board.length; i++){
      board[i].forEach((item, index) =>{
        if (item === "X") {indexArrX.push(index)}
        else if (item === "O") {indexArrO.push(index)};
      })
    }

    //counting how many occurances for each index

    let XCounter0 = 0;
    let XCounter1 = 0;
    let XCounter2 = 0;

    let OCounter0 = 0;
    let OCounter1 = 0;
    let OCounter2 = 0;

    indexArrX.forEach((item) =>{
      if (item === 0) {XCounter0++}
      else if (item === 1) {XCounter1++}
      else if (item === 2) {XCounter2++}
    });

    indexArrO.forEach((item) =>{
      if (item === 0) {OCounter0++}
      else if (item === 1) {OCounter1++}
      else if (item === 2) {OCounter2++}
    })

    //if any of the counters are 3, the corresponding player is the winner!
    if (XCounter0 === 3 || XCounter1 === 3 || XCounter2 === 3){

      Players.player1.winner();
      player1Win = Players.player1.getWinStatus();

    } else if (OCounter0 === 3 || OCounter1 === 3 || OCounter2 === 3){

      Players.player2.winner();
      player2Win = Players.player2.getWinStatus();

    }
  }

  //--Check for diagonal win --

  return {player1Win, player2Win, checkRowWin, checkColWin}

})()


//playing the game - user input
const Game = (() =>{

  const player1 = Players.player1;
  const player2 = Players.player2;
  
  let board = Gameboard.board;
  const newBoard = Gameboard.newBoard;
  const printBoard = Gameboard.printBoard;

  let turnOrder = 1;
  const nextTurn = () => turnOrder++;
  const resetTurn = () => turnOrder = 1;
  const getTurn = () => turnOrder;

  const checkRowWin = CheckWin.checkRowWin;
  const checkColWin = CheckWin.checkColWin;


  //print board on startup
  printBoard();
  console.log("Player 1's turn!")

  //new game
  const newGame = () => {
    newBoard();
    board = Gameboard.board;
    resetTurn();
    player1.resetWinner();
    player2.resetWinner();

    printBoard();
  }

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
      checkColWin();

      if (player1.getWinStatus() === true){
        printBoard();
        console.log("Player 1 is the winner!");

        //reset board, prevent further input
        board = [];

      } else if (player2.getWinStatus() === true){
        printBoard();
        console.log("Player 2 is the winner!");

        //reset board, prevent further input
        board = [];

      } else{
        //if no winner is determined, continue to next turn
        //add to turnOrder counter
        nextTurn();
          
        //brings up updated board
        printBoard();
        if (turnOrder % 2 == 0){
          console.log("Player 2's turn!");
        } else{
          console.log("Player 1's turn!");
        }        
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

  return {placeMark, newGame}
})();


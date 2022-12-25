const title = document.querySelector(".board__title");
const allSquares = document.querySelectorAll(".board__square");

let currentPlayer = 'X';
let gameOver = false;
let board = new Array(9);

allSquares.forEach((square, i) => {
  square.addEventListener("click", () => {
    if (square.innerHTML || gameOver) {
      // Invalid click 
      return;
    }

    board[i] = currentPlayer;
    square.innerHTML = currentPlayer;

    if (checkWin()) {
      title.innerHTML = `${currentPlayer} Won The Game!`;
      return (gameOver = true);
    }

    if (checkTie()) {
      title.innerHTML = `Draw!`;
      return (gameOver = true);
    }

    switchPlayers();
    title.innerHTML = `${currentPlayer}'s Turn`;
  });
});

function checkWin() {
  const winningIndicies = [
    // Horizontal wins
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical wins
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal wins
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningIndicies.length; ++i) {
    const matchingIndicies = winningIndicies[i];
    const symbol1 = board[matchingIndicies[0]];
    const symbol2 = board[matchingIndicies[1]];
    const symbol3 = board[matchingIndicies[2]];
    if (!symbol1 || !symbol2 || !symbol3) {
      continue;
    }
    if (symbol1 === symbol2 && symbol2 === symbol3) {
      return true;
    }
  }
}

function checkTie() {
  for (let i = 0; i < board.length; ++i) {
    if (board[i] === undefined) {
      return false
    }
  }
  return true
}

function restartGame() {
  gameOver = false;
  board = new Array(9);
  allSquares.forEach((square) => {
    square.innerHTML = "";
    title.innerHTML = `${currentPlayer}'s turn`;
  });
}

function switchPlayers() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}
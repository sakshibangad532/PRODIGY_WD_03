document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const resetButton = document.getElementById('reset-button');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    // Create the game board
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.index = i;
      cell.addEventListener('click', () => handleCellClick(i));
      board.appendChild(cell);
    }
  
    // Handle cell click
    function handleCellClick(index) {
      if (!gameActive || gameBoard[index] !== '') return;
  
      gameBoard[index] = currentPlayer;
      renderBoard();
      checkWinner();
  
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  
    // Render the game board
    function renderBoard() {
      const cells = document.querySelectorAll('.cell');
      cells.forEach((cell, index) => {
        cell.textContent = gameBoard[index];
      });
    }
  
    // Check for a winner
    function checkWinner() {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];
  
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          announceWinner(gameBoard[a]);
          return;
        }
      }
  
      if (!gameBoard.includes('')) {
        announceTie();
      }
    }
  
    // Announce the winner
    function announceWinner(winner) {
      alert(`Player ${winner} wins!`);
      gameActive = false;
    }
  
    // Announce a tie
    function announceTie() {
      alert("It's a tie!");
      gameActive = false;
    }
  
    // Reset the game
    resetButton.addEventListener('click', () => {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      currentPlayer = 'X';
      gameActive = true;
      renderBoard();
    });
  });
  

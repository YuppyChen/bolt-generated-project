const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    const cells = Array.from(document.querySelectorAll('.cell'));
    let currentPlayer = 'X';
    let gameActive = true;

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    function checkWin() {
      return winningCombinations.some(combination => {
        return combination.every(index => {
          return cells[index].textContent === currentPlayer;
        });
      });
    }

    function checkDraw() {
      return cells.every(cell => cell.textContent !== '');
    }

    function handleCellClick(event) {
      const cell = event.target;
      const index = cell.dataset.index;

      if (cell.textContent === '' && gameActive) {
        cell.textContent = currentPlayer;
        if (checkWin()) {
          status.textContent = `Player ${currentPlayer} wins!`;
          gameActive = false;
        } else if (checkDraw()) {
          status.textContent = 'It\'s a draw!';
          gameActive = false;
        } else {
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          status.textContent = `Player ${currentPlayer}'s turn`;
        }
      }
    }

    function resetGame() {
      cells.forEach(cell => {
        cell.textContent = '';
      });
      currentPlayer = 'X';
      gameActive = true;
      status.textContent = `Player ${currentPlayer}'s turn`;
    }

    cells.forEach(cell => {
      cell.addEventListener('click', handleCellClick);
    });

    resetButton.addEventListener('click', resetGame);

    resetGame();

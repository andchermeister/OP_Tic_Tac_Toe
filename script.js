// function for handling players

function Player(name, marker) {
    return {name, marker};
}

// function for playing the game

function play() {
    let P1 = Player('First player', 'X');
    let P2 = Player('Seconds player', 'O');
    let currentPlayer = P1;
    const cells = document.querySelectorAll('.cell');

    document.getElementById('currentPlayer').innerHTML = `${currentPlayer.marker}'s turn`;

    placeMarker();

    // function for placing markers

    function placeMarker(currentMarker) {

        cells.forEach(cell => {
            cell.addEventListener('click', function() {
                if (cell.innerHTML === '') {
                    cell.innerHTML = currentPlayer.marker;
                    if (!checkWinner() && !checkDraw()) {
                        switchPlayer();
                    }
                }
            }, {once: true});
        }
        );
    }

    // function for switching player

    function switchPlayer() {
        currentPlayer = (currentPlayer === P1) ? P2 : P1;
        document.getElementById('currentPlayer').innerHTML = `${currentPlayer.marker}'s turn`;
    };

    // function for checking winner

    function checkWinner(board) {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal combs
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical combs
            [0, 4, 8], [2, 4, 6] // diagonal combs
        ];

        for (let combination of winningCombinations) {
            const [a, b, c] = combination;

            if (
                cells[a].innerHTML !== '' &&
                cells[a].innerHTML === cells[b].innerHTML &&
                cells[a].innerHTML === cells[c].innerHTML
            ) {
                alert(`${currentPlayer.marker} wins!`);
                document.getElementById('currentPlayer').innerHTML = `${currentPlayer.marker} wins!`;
                return true;
            }
            
        };

        return false;
    };

    // function for checking draw

    function checkDraw() {
        for (let cell of cells) {
            if(cell.innerHTML === '') {
                return false;
            }
        };
        alert("It's a draw");
        document.getElementById('currentPlayer').innerHTML = `It's a draw!`;
        return true;
    }

    // function for restarting the game

   function restart() {
    currentPlayer = P1;

    cells.forEach(cell => {
        cell.innerHTML = ''; 
    });

    document.getElementById('currentPlayer').innerHTML = `${currentPlayer.marker}'s turn`;

    placeMarker();

   }
   
   document.getElementById('resetButton').onclick = restart;

};

 
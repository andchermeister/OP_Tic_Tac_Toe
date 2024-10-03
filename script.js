function Player(name, marker) {
    return {name, marker};
};

function gameBoard () {
    let board = Array(9).fill(null);

    function getBoard() {
        return board;
    }

    function placeMarker(index, marker) {
        if (index >= 0 && index < 9 && board[index] === null) {
            board[index] = marker;
            return true;
        }
        return false;
    };

    function resetBoard() {
        board = Array(9).fill(null);
    };

    function printBoard() {
        console.clear();
        console.log(`${board[0]} | ${board[1]} | ${board[2]}`)
        console.log('-----+------+-----')
        console.log(`${board[3]} | ${board[4]} | ${board[5]}`)
        console.log('-----+------+-----')
        console.log(`${board[6]} | ${board[7]} | ${board[8]}`)
    };

    return {getBoard, placeMarker, resetBoard, printBoard}
};

function game(player1, player2) {
    const P1 = Player(player1, 'X');
    const P2 = Player(player2, 'O');
    const GameBoard = gameBoard();

    let currentPlayer = P1;
    console.log(currentPlayer);
    switchPlayer(P1, P2);
    console.log(currentPlayer);

    function switchPlayer() {
        currentPlayer = currentPlayer === P1 ? P2 : P1;
    };

    function playRound(index) {
        if (GameBoard.placeMarker(index, currentPlayer.marker)) {
            GameBoard.printBoard();
            if (checkWin()) {
                console.log(`${currentPlayer.name} wins!`)
                return true;
            } else if (GameBoard.getBoard().every(cell => cell !== null)) {
                console.log("It's a draw!")
                return true;
            }
            switchPlayer();
        } else {
            console.log("Invalid move, try again.")
        }
        return false;
    };

    function checkWin() {
        const Board = GameBoard.getBoard();
        const WinningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let combination of WinningCombinations) {
            const [a, b, c] = combination;

            if(Board[a] && Board[a] === Board[b] && Board[a] === Board[c]) {
                return true;
            };
        };

        return false;
        
    };


    function start() {
        GameBoard.printBoard();
        let gameOver = false;
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });



        function askMove() {
            readline.question(`${currentPlayer.name} (${currentPlayer.marker}), enter your move(0-8): `, (input) => {
                const index = parseInt(input);
                if (!isNaN(index)) {
                    gameOver = playRound(index);
                } else {
                    console.log("Please enter a valid number between 0 and 8.")
                }
                if (!gameOver) {
                    askMove();
                } else {
                    readline.close();
                }
            });
        };

        askMove();

    };

    return { start };

};

const ticTacToeGame = game("Andrii", "Yuliia");
ticTacToeGame.start();

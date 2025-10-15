import { act, useState } from "react";
import Player from "./components/Player" ;
import GameBoard from "./components/GameBoard";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combination.js";
import Gameover from "./components/Gameover.jsx";

const initialGameboard = [
  [null, null, null], 
  [null, null ,null], 
  [null, null ,null]
];

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if(gameTurns.length>0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  const [gameTurns , setGameTurns] = useState([]);
  // const [hasWinner , setHasWinner] = useState(false);
  // const [activePlayer , setActivePlayer] = useState('X');
  const activePlayer  = deriveActivePlayer(gameTurns);

  let gameBoard = initialGameboard;

  for(const turn of gameTurns ){
      const {square, player} = turn;
      const {row , col} = square;

      gameBoard[row][col] = player;
  }

  let winner;

  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleActivePlayer(rowIndex , colIndex){
    // setActivePlayer((currActive) => currActive === 'X' ?'O':'X');
    setGameTurns(prevTurns => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      
      const updatedTurns = [
        {square: 
          {row:rowIndex , col : colIndex} , 
          player :currentPlayer}
          ,...prevTurns];
      
      return updatedTurns;
    } );
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName = "player 1" 
            symbol = "X" 
            isActive={activePlayer === 'X'}
          />
          <Player 
            initialName = "player 2" 
            symbol = "O" 
            isActive={activePlayer === 'O'}
          />
        </ol>
        {(winner || hasDraw)&& <Gameover winner = {winner}/>}
        <GameBoard 
          onSelectSquare={handleActivePlayer} 
          board = {gameBoard}
          />
      </div>
      <Log turns = {gameTurns}/>
    </main>
  )
}

export default App

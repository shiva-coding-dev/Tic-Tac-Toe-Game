import { act, useState } from "react";
import Player from "./components/Player" ;
import GameBoard from "./components/GameBoard";
function App() {
  const [activePlayer , setActivePlayer] = useState('X');

  function handleActivePlayer(){
    setActivePlayer((currActive) => currActive === 'X' ?'O':'X');
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName = "player 1" symbol = "X" isActive={activePlayer === 'X' }/>
          <Player initialName = "player 2" symbol = "O" isActive={activePlayer === 'O' }/>
        </ol>
        <GameBoard onSelectSquare={handleActivePlayer} activePlayerSymbol={activePlayer}/>
      </div>
    </main>
  )
}

export default App

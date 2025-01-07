import "./App.css";
import { useState } from "react";
import PlayerScore from "./components/PlayerScore";
import GameTitleHeader from "./components/GameTitleHeader";
import GameBoard from "./components/GameBoard";

function App() {
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  const [gameMessage, setGameMessage] = useState("Player 1 turn");
  return (
    <div className="App bg-slate-950 min-h-full text-white">
      <GameTitleHeader />
      <PlayerScore
        playerOneScore={playerOneScore}
        playerTwoScore={playerTwoScore}
        gameMessage={gameMessage}
      />
      <GameBoard />
    </div>
  );
}

export default App;

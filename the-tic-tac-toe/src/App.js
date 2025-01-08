import "./assets/App.css";
import { useState } from "react";
import PlayerScore from "./components/PlayerScore";
import GameTitleHeader from "./components/GameTitleHeader";
import GameBoard from "./components/GameBoard";

function App() {
  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);
  return (
    <div className="App bg-slate-950 min-h-full text-white">
      <GameTitleHeader />
      <GameBoard />
    </div>
  );
}

export default App;

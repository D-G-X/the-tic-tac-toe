import { useState } from "react";
import "../assets/GameBoard.css";

function GameBoard() {
  const WIDTH = 3;
  const HEIGHT = 3;
  const WINNING_COMBINATIONS = [
    ["00", "01", "02"],
    ["10", "11", "12"],
    ["20", "21", "22"],
    ["00", "11", "22"],
    ["20", "11", "02"],
    ["00", "10", "20"],
    ["01", "11", "21"],
    ["02", "12", "22"],
  ];
  const [playerOneTiles, setPlayerOneTiles] = useState(new Set());
  const [playerTwoTiles, setPlayerTwoTiles] = useState(new Set());
  const [playerTurn, setPlayerTurn] = useState(Math.random() < 0.5 ? 1 : 2);
  const [gameMessage, setGameMessage] = useState(`Player ${playerTurn} Turn`);
  const [roundOver, setRoundOver] = useState(false);

  const [playerOneScore, setPlayerOneScore] = useState(0);
  const [playerTwoScore, setPlayerTwoScore] = useState(0);

  const onTileClick = (tileCoordinate) => {
    if (
      !playerOneTiles.has(tileCoordinate) &&
      !playerTwoTiles.has(tileCoordinate) &&
      !roundOver
    ) {
      let playerTiles =
        playerTurn === 1
          ? new Set([...playerOneTiles, tileCoordinate])
          : new Set([...playerTwoTiles, tileCoordinate]);

      playerTurn === 1
        ? setPlayerOneTiles(playerTiles)
        : setPlayerTwoTiles(playerTiles);

      if (checkWinner(playerTiles)) {
        setGameMessage(`Player ${playerTurn} Winner`);
        if (playerTurn === 1) {
          setPlayerOneScore(playerOneScore + 1);
        } else {
          setPlayerTwoScore(playerTwoScore + 1);
        }
        setRoundOver(true);
        setTimeout(() => {
          resetGameBoard();
        }, 3000);
      } else if (
        playerOneTiles.size + 1 + playerTwoTiles.size ===
        WIDTH * HEIGHT
      ) {
        setGameMessage("Draw");
        setTimeout(() => {
          resetGameBoard();
        }, 3000);
        setRoundOver(true);
      } else {
        setGameMessage(`Player ${playerTurn === 1 ? 2 : 1} Turn`);
        setPlayerTurn(playerTurn === 1 ? 2 : 1);
      }
    }
  };

  const checkWinner = (selectedTiles) => {
    return WINNING_COMBINATIONS.some((winning_set) => {
      return winning_set.every((tile) => selectedTiles.has(tile))
        ? true
        : false;
    });
  };

  const resetGameBoard = () => {
    setPlayerOneTiles(new Set());
    setPlayerTwoTiles(new Set());
    setPlayerTurn(playerTurn === 1 ? 2 : 1);
    setGameMessage(`Player ${playerTurn === 1 ? 2 : 1} Turn`);
    setRoundOver(false);
  };

  return (
    <>
      <div className="flex justify-between px-5 mt-12">
        <div>
          <div className="text-3xl font-bold p-2 text-center">Player 1</div>
          <div className="text-6xl text-center py-2">{playerOneScore}</div>
        </div>
        <div>
          <div className="text-3xl font-bold p-2">Player 2</div>
          <div className="text-6xl text-center py-2">{playerTwoScore}</div>
        </div>
      </div>
      <div className="text-center text-4xl">
        <div>{gameMessage}</div>
      </div>
      <div className="text-white flex justify-center mt-16 pb-10">
        {Array.from({ length: WIDTH }).map((w, wi) => {
          return (
            <div>
              {Array.from({ length: HEIGHT }).map((h, hi) => {
                let className = `text-center py-20 board-tile border border-white text-4xl`;
                className +=
                  hi !== 0 && hi !== HEIGHT - 1 ? " border-y-2" : " border-y-0";
                className +=
                  wi !== 0 && wi !== WIDTH - 1 ? " border-x-2" : " border-x-0";

                let tileCoordinate = wi.toString() + hi.toString();

                return (
                  <div
                    key={tileCoordinate}
                    className={className}
                    onClick={() => {
                      onTileClick(tileCoordinate);
                    }}
                  >
                    {playerOneTiles.has(wi.toString() + hi.toString())
                      ? "P1"
                      : playerTwoTiles.has(wi.toString() + hi.toString())
                      ? "P2"
                      : ""}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {roundOver ? (
        <div className="flex justify-center text-2xl font-bold py-10">
          <button
            className="px-5 py-2 bg-orange-300 text-black rounded-lg"
            onClick={() => {
              resetGameBoard();
            }}
          >
            Next Round
          </button>
        </div>
      ) : null}
    </>
  );
}

export default GameBoard;

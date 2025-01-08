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
  const [playerTurn, setPlayerTurn] = useState(Math.random() < 0.5 ? 1 : 2);
  const [gameMessage, setGameMessage] = useState(`Player ${playerTurn} Turn`);
  const [roundOver, setRoundOver] = useState(false);

  const [playerOneTiles, setPlayerOneTiles] = useState(new Set());
  const [playerTwoTiles, setPlayerTwoTiles] = useState(new Set());
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
        setRoundOver(true);
      } else if (
        playerOneTiles.size + 1 + playerTwoTiles.size ===
        WIDTH * HEIGHT
      ) {
        setGameMessage("Round Draw");
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

  return (
    <>
      <div className="text-center text-4xl">
        <div>{gameMessage}</div>
      </div>
      <div className="text-white flex justify-center mt-16 pb-10">
        {Array.from({ length: WIDTH }).map((w, wi) => {
          return (
            <div>
              {Array.from({ length: HEIGHT }).map((h, hi) => {
                let className = `text-center py-20 board-tile border border-white text-4xl border-y-${
                  hi !== 0 && hi !== HEIGHT - 1 ? 2 : 0
                } border-x-${wi !== 0 && wi !== WIDTH - 1 ? 2 : 0}`;

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
    </>
  );
}

export default GameBoard;

// import { useState } from "react";

function GameBoard() {
  const WIDTH = 3;
  const HEIGHT = 3;
  //   const [playerOneTiles, setPlayerOneTiles] = useState(new Set());
  //   const [playerTwoTiles, setPlayerTwoTiles] = useState(new Set());
  return (
    <div className="text-white flex justify-center mt-16 pb-10">
      {Array.from({ length: WIDTH }).map((w, wi) => {
        return (
          <div>
            {Array.from({ length: HEIGHT }).map((h, hi) => {
              return (
                <div
                  key={wi.toString() + hi.toString()}
                  className={"border border-white p-24"}
                >
                  {wi.toString() + hi.toString()}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default GameBoard;

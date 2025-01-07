function PlayerScore(props) {
  return (
    <>
      <div className="flex justify-between px-5 mt-12">
        <div>
          <div className="text-3xl font-bold p-2 text-center">Player 1</div>
          <div className="text-6xl text-center py-2">
            {props.playerOneScore}
          </div>
        </div>
        <div>
          <div className="text-3xl font-bold p-2">Player 2</div>
          <div className="text-6xl text-center py-2">
            {props.playerTwoScore}
          </div>
        </div>
      </div>
      <div className="text-center text-3xl my-3">
        <div>{props.gameMessage}</div>
      </div>
    </>
  );
}

export default PlayerScore;

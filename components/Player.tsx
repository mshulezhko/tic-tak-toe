import React from "react";

type Props = {
  currentPlayer: string | null;
  personOne: string | null;
  personTwo: string;
};

const Player = ({ currentPlayer, personOne, personTwo }: Props) => {
  return (
    <div className="player-wrap">
      <div
        className={`player ${
          currentPlayer === personOne ? "currentPlayer" : ""
        }`}
      >
        {personOne}
      </div>{" "}
      <div
        className={`player ${
          currentPlayer === personTwo ? "currentPlayer" : ""
        }`}
      >
        {personTwo}
      </div>{" "}
    </div>
  );
};

export default Player;

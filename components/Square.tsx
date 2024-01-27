import React from "react";

type Props = {
  onClick: () => void;
  value: string | null;
  winner: string | null;
};

const Square = ({ onClick, value, winner }: Props) => {
  if (!value) {
    return (
      <button
        className="square-btn"
        disabled={Boolean(winner)}
        onClick={onClick}
      ></button>
    );
  }

  return <button className="square-btn">{value}</button>;
};

export default Square;

import React from "react";

type Props = {
  onClick: () => void;
  value: string | null;
  winner: string | null;
};

const Square = ({ onClick, value, winner }: Props) => {
  if (!value) {
    return (
      <button disabled={Boolean(winner)} onClick={onClick}>
        jkjkk
      </button>
    );
  }

  return <button>{value}8888</button>;
};

export default Square;

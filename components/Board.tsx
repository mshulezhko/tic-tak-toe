"use client";
import React, { useState } from "react";
import Square from "./Square";

const Board: React.FC = () => {
  const [winner, setWinner] = useState<string | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [squares, setSquares] = useState<(string | null)[]>(
    Array(9).fill(null)
  );

  const setSquareValue = (index: number) => {
    const newData: (string | null)[] = squares.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      }

      return val;
    });

    setSquares(newData);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  return (
    <div className="board">
      <div className="board-header">Hello{currentPlayer}</div>
      <div className="grid">
        {squares.map((_, i) => {
          return (
            <Square
              key={i}
              onClick={() => setSquareValue(i)}
              value={squares[i]}
              winner={winner}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Board;

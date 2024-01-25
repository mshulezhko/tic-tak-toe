"use client";
import React, { useEffect, useState } from "react";
import Square from "../Square";
import calculateWinner from "@/app/utils/calculateWinner";

const MultiGameBoard: React.FC = () => {
  const [winner, setWinner] = useState<string | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [squares, setSquares] = useState<(string | null)[]>(
    Array(9).fill(null)
  );

  ///utils
  // const calculateWinner = () => {
  //   const variants = [
  //     [0, 1, 2],
  //     [3, 4, 5],
  //     [6, 7, 8],
  //     [0, 3, 6],
  //     [1, 4, 7],
  //     [2, 5, 8],
  //     [0, 4, 8],
  //     [2, 4, 6],
  //   ];

  //   for (let i = 0; i < variants.length; i++) {
  //     console.log("variants[i]");
  //     console.log(variants[i]);
  //     const [a, b, c] = variants[i];

  //     if (
  //       squares[a] &&
  //       squares[a] === squares[b] &&
  //       squares[a] === squares[c]
  //     ) {
  //       return squares[a];
  //     }
  //   }
  //   return null;
  // };

  useEffect(() => {
    const newWinner = calculateWinner(squares);

    if (newWinner) {
      setWinner(newWinner);
    }

    if (!newWinner && !squares.filter((el) => !el).length) {
      setWinner("It's a Draw");
    }
  }, [squares]);

  //not single game
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

  ///utils

  const reset = () => {
    setWinner(null);
    setCurrentPlayer("X");
    setSquares(Array(9).fill(null));
  };

  //single game
  const setSquareValueAI = () => {};

  return (
    <div className="board">
      <h1>{winner}</h1>
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

      <div>
        <button onClick={reset}>play again</button>
      </div>
    </div>
  );
};

export default MultiGameBoard;

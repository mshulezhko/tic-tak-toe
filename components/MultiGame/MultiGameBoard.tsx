"use client";
import React, { useEffect, useState } from "react";
import Square from "../Square";
import calculateWinner from "@/app/utils/calculateWinner";
import {
  cleanLocalStorage,
  saveLocalStorageBoard,
  checkLocalStorageBoard,
} from "@/app/utils/storage";
import Link from "next/link";

const MultiGameBoard: React.FC = () => {
  const localStorageCheck = checkLocalStorageBoard();
  console.log("localStorageCheck");
  console.log(localStorageCheck?.currentPlayer);
  const [winner, setWinner] = useState<string | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<string>(
    localStorageCheck?.currentPlayer || "🐼"
  );
  const [squares, setSquares] = useState<(string | null)[]>(
    localStorageCheck?.squares || Array(9).fill(null)
  );

  useEffect(() => {
    const newWinner = calculateWinner(squares);

    if (newWinner) {
      setWinner(newWinner);
    }

    if (!newWinner && !squares.filter((el) => !el).length) {
      setWinner("It's a Draw");
    }

    saveLocalStorageBoard({
      squares,
      currentPlayer,
      emoji: null,
    });
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
    setCurrentPlayer(currentPlayer === "🐼" ? "🐻" : "🐼");
  };

  ///utils
  const reset = () => {
    setWinner(null);
    setCurrentPlayer("🐼");
    setSquares(Array(9).fill(null));
  };

  const goHome = () => {
    cleanLocalStorage();
    location.reload();
  };

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
        <Link href="/" onClick={goHome}>
          {" "}
          go home
        </Link>
      </div>
    </div>
  );
};

export default MultiGameBoard;

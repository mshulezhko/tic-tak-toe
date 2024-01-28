"use client";
import React, { useEffect, useState } from "react";
import Square from "../Square";
import calculateWinner, { whoWonConditions } from "@/app/utils/calculateWinner";
import {
  cleanLocalStorage,
  saveLocalStorageBoard,
  checkLocalStorageBoard,
} from "@/app/utils/storage";
import WinnerPopup from "../WinnerPopup";
import Player from "../Player";

const MultiGameBoard: React.FC = () => {
  const localStorageCheck = checkLocalStorageBoard();
  const [winner, setWinner] = useState<string | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<string>(
    localStorageCheck?.currentPlayer || "🐼"
  );
  const [squares, setSquares] = useState<(string | null)[]>(
    localStorageCheck?.squares || Array(9).fill(null)
  );
  const personOne = "🐼";
  const personTwo = "🐻";

  useEffect(() => {
    const newWinner = calculateWinner(squares);

    if (newWinner) {
      setWinner(`Player ${newWinner} is winner!`);
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
    <div>
      {!winner && (
        <div className="single-game-board-wrap">
          <Player
            currentPlayer={currentPlayer}
            personOne={personOne}
            personTwo={personTwo}
          />
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
      )}

      {winner && <WinnerPopup winner={winner} reset={reset} goHome={goHome} />}
    </div>
  );
};

export default MultiGameBoard;

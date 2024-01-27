"use client";
import React, { useEffect, useState } from "react";
import Square from "../Square";
import calculateWinner from "@/app/utils/calculateWinner";
import {
  checkLocalStorageBoard,
  checkLocalStorageEmoji,
  cleanLocalStorage,
  saveLocalStorageBoard,
} from "@/app/utils/storage";
import Link from "next/link";

type Props = {
  randomEmoji: string;
};

const SingleGameBoard = ({ randomEmoji }: Props) => {
  const localStorageCheck = checkLocalStorageBoard();
  const localStorageCheckEmoji: null | string = checkLocalStorageEmoji();
  const checkRandomEmoji = randomEmoji ? randomEmoji : localStorageCheckEmoji;
  const [winner, setWinner] = useState<string | null>(null);

  const [squares, setSquares] = useState<(string | null)[]>(
    localStorageCheck?.squares || Array(9).fill(null)
  );

  const [currentPlayer, setCurrentPlayer] = useState<string | null>(
    randomEmoji || (localStorageCheck?.currentPlayer as string) || ""
  );

  const robotIcon: string = "🤖";
  const humanIcon: string | null = checkRandomEmoji;

  useEffect(() => {
    const newWinner = calculateWinner(squares);
    setWinner(newWinner);

    if (currentPlayer === robotIcon) {
      setTimeout(() => {
        moveRobot();
      }, 300);
    }
  }, [currentPlayer]);

  const setSquareValue = (index: number) => {
    if (!calculateWinner(squares)) {
      const newData = squares.map((val, i) => {
        if (i === index) {
          return currentPlayer;
        }

        return val;
      });

      const currentPlayerConditions =
        currentPlayer === checkRandomEmoji ? robotIcon : checkRandomEmoji;

      setSquares(newData);
      setCurrentPlayer(currentPlayerConditions);

      saveLocalStorageBoard({
        squares: newData,
        currentPlayer: currentPlayerConditions,
        emoji: humanIcon,
      });
    }
  };

  const moveRobot = () => {
    // Check if the robot can win in the next move
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        const tempSquares = [...squares];
        tempSquares[i] = robotIcon;

        if (calculateWinner(tempSquares) === robotIcon) {
          setSquareValue(i);
          return;
        }
      }
    }

    // Check if the human can win in the next move and block it
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        const tempSquares = [...squares];
        tempSquares[i] = randomEmoji;

        if (calculateWinner(tempSquares) === randomEmoji) {
          setSquareValue(i);
          return;
        }
      }
    }

    // If no immediate winning or blocking move, make a random move
    const emptySquare: number[] = [];
    squares.forEach((element, index) => {
      if (!element) {
        emptySquare.push(index);
      }
    });

    const randomIndex: number = Math.floor(Math.random() * emptySquare.length);

    setSquareValue(emptySquare[randomIndex]);
  };

  const goHome = () => {
    cleanLocalStorage();
    location.reload();
  };

  return (
    <div>
      <div>
        Human{humanIcon} - Robbot {robotIcon}
      </div>
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
        <h1>{winner}</h1>
      </div>
      <Link href="/" onClick={goHome}>
        {" "}
        go home
      </Link>
    </div>
  );
};

export default SingleGameBoard;

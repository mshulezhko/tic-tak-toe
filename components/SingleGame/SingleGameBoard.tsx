"use client";
import React, { useEffect, useState } from "react";
import Square from "../Square";
import calculateWinner from "@/app/utils/calculateWinner";
import {
  checkLocalStorageBoard,
  cleanLocalStorage,
  saveLocalStorageBoard,
} from "@/app/utils/storage";
import Link from "next/link";
// import ChooseIcon from "./ChooseIcon";

type Props = {
  randomEmoji: string;
};

const SingleGameBoard = ({ randomEmoji }: Props) => {
  const localStorageCheck = checkLocalStorageBoard();
  const [winner, setWinner] = useState<string | null>(null);

  const [squares, setSquares] = useState<(string | null)[]>(
    localStorageCheck?.squares || Array(9).fill(null)
  );
  const [currentPlayer, setCurrentPlayer] = useState<string>(
    localStorageCheck?.currentPlayer || randomEmoji
  );

  ///const
  const [robotIcon, setRobotIcon] = useState<string>("🤖");
  const [humanIcon, setHumanIcon] = useState<string>(
    localStorageCheck?.currentPlayer || randomEmoji
  );
  //

  useEffect(() => {
    console.log("  useEffect(() => {");

    const newWinner = calculateWinner(squares);
    setWinner(newWinner);

    saveLocalStorageBoard({
      squares,
      currentPlayer,
      emoji: humanIcon,
    });

    if (currentPlayer === robotIcon) {
      setTimeout(() => {
        moveRobot();
      }, 300);
    }
  }, [currentPlayer]);

  const setSquareValue = (index: number) => {
    const newData = squares.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      }

      return val;
    });

    setSquares(newData);
    setCurrentPlayer(currentPlayer === randomEmoji ? robotIcon : randomEmoji);
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
    console.log("squares +++++");
    console.log(squares);
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

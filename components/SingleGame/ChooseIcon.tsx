"use client";
import React, { useEffect, useState } from "react";
import SingleGameBoard from "./SingleGameBoard";
import {
  checkLocalStorageBoard,
  cleanLocalStorage,
  saveLocalStorageBoard,
  checkLocalStorageEmoji,
} from "@/app/utils/storage";
import Link from "next/link";

const ChooseIcon = () => {
  const localStorageCheckEmoji = checkLocalStorageEmoji();
  console.log("localStorageCheckEmoji =>ChooseIcon");
  console.log(localStorageCheckEmoji);

  const [randomEmoji, setRandomEmoji] = useState<string>("");
  const [emojiList, setEmojiList] = useState<string[]>([]);
  const [nextStep, setNextStep] = useState<boolean>(
    localStorageCheckEmoji ? true : false
  );

  useEffect(() => {
    setEmojiList(["😎", "🤓", "😻", "🤪", "🤗", "😝", "😫"]);
  }, []);

  const chooseEmoji = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e.currentTarget.innerText);
    setRandomEmoji(e.currentTarget.innerText);
  };

  const startGame = () => {
    console.log("Start game " + randomEmoji);

    if (randomEmoji) {
      setNextStep(true);
      saveLocalStorageBoard({
        squares: [],
        currentPlayer: randomEmoji,
        emoji: randomEmoji,
      });
    }
  };

  const goHome = () => {
    cleanLocalStorage();
    location.reload();
  };

  console.log("nextStep ===>");
  console.log(nextStep);

  return (
    <div>
      {!nextStep && (
        <>
          {" "}
          <h1>Choose your emoji</h1>
          <div className="emoji-choose-wrap">
            {emojiList.map((emj, idx) => {
              return (
                <div key={idx} onClick={chooseEmoji}>
                  {emj}
                </div>
              );
            })}
          </div>
          <button onClick={startGame}>Start Game</button>
          <Link href="/" onClick={goHome}>
            {" "}
            go home
          </Link>{" "}
        </>
      )}

      {nextStep && <SingleGameBoard randomEmoji={randomEmoji} />}
    </div>
  );
};

export default ChooseIcon;

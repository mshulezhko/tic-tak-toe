"use client";
import React, { useEffect, useState } from "react";
import SingleGameBoard from "./SingleGameBoard";
import {
  cleanLocalStorage,
  saveLocalStorageBoard,
  checkLocalStorageEmoji,
} from "@/app/utils/storage";
import Link from "next/link";

const ChooseIcon = () => {
  const localStorageCheckEmoji: null | string = checkLocalStorageEmoji();

  const [randomEmoji, setRandomEmoji] = useState<string>("");
  const [emojiList, setEmojiList] = useState<string[]>([]);
  const [nextStep, setNextStep] = useState<boolean>(
    localStorageCheckEmoji ? true : false
  );
  const [selectedEmoji, setSelectedEmoji] = useState<null | string>(null);

  useEffect(() => {
    setEmojiList(["😎", "🤓", "🤪", "🤗", "😝", "😫"]);
  }, []);

  // const selectEmoji = () => {
  //   setSelectedEmoji("selected");
  // };

  const chooseEmoji = (e: React.MouseEvent<HTMLElement>) => {
    setRandomEmoji(e.currentTarget.innerText);
  };

  const startGame = () => {
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

  return (
    <div className="choose-container">
      {!nextStep && (
        <>
          {" "}
          <h1 className="choose-emoji-title">Choose your emoji</h1>
          <div className="emoji-choose-wrap">
            {emojiList.map((emj, idx) => {
              return (
                <div
                  key={idx}
                  className={`choose-emoji-square ${
                    randomEmoji === emj ? "selected" : ""
                  }`}
                  onClick={chooseEmoji}
                >
                  {emj}
                </div>
              );
            })}
          </div>
          <div className="container-choose-btn">
            <Link className="goHome" href="/" onClick={goHome}>
              {" "}
              Back
            </Link>{" "}
            <button className="play" onClick={startGame}>
              Play
            </button>
          </div>
        </>
      )}

      {nextStep && <SingleGameBoard randomEmoji={randomEmoji} />}
    </div>
  );
};

export default ChooseIcon;

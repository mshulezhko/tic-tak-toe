"use client";
import React, { useEffect, useState } from "react";
import SingleGameBoard from "./SingleGameBoard";

const ChooseIcon = () => {
  const [randomEmoji, setRandomEmoji] = useState<string>("");
  const [emojiList, setEmojiList] = useState<string[]>([]);
  const [nextStep, setNextStep] = useState<boolean>(false);

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
    }
  };

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
        </>
      )}
      {nextStep && <SingleGameBoard randomEmoji={randomEmoji} />}
    </div>
  );
};

export default ChooseIcon;

"use client";
import React, { useEffect, useState } from "react";
import MultiGameBoard from "../MultiGame/MultiGameBoard";
import ChooseIcon from "../SingleGame/ChooseIcon";
import {
  saveToLocalStorageMode,
  GameMode,
  getLocalStorageMode,
} from "@/app/utils/storage";
import Footer from "../Footer";

const HomePage = () => {
  const [isSingleMode, setIsSingleMode] = useState<boolean>(false);
  const [isMultiMode, setIsMultiMode] = useState<boolean>(false);
  const localStorageMode: GameMode = getLocalStorageMode();

  useEffect(() => {
    if (isSingleMode || isMultiMode) {
      const localStorageData: GameMode = {
        isSingleMode,
        isMultiMode,
      };

      saveToLocalStorageMode(localStorageData);
    }

    if (localStorageMode?.isSingleMode || localStorageMode?.isMultiMode) {
      setIsSingleMode(localStorageMode.isSingleMode);
      setIsMultiMode(localStorageMode.isMultiMode);
    }
  }, [isSingleMode, isMultiMode]);

  return (
    <div className="container">
      {!isMultiMode && !isSingleMode && (
        <div className="container-home">
          <h1 className="title">
            Tic <span className="title-animation typing">Tac Toe</span>
          </h1>
          <div className="container-home-btn">
            <button className="mode-btn" onClick={() => setIsSingleMode(true)}>
              Single Player
            </button>
            <button className="mode-btn" onClick={() => setIsMultiMode(true)}>
              Multi Player
            </button>
          </div>
        </div>
      )}

      {isMultiMode && <MultiGameBoard />}
      {isSingleMode && <ChooseIcon />}
      <Footer />
    </div>
  );
};

export default HomePage;

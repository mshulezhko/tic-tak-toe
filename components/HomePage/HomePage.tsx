"use client";
import React, { useEffect, useState } from "react";
import MultiGameBoard from "../MultiGame/MultiGameBoard";
import ChooseIcon from "../SingleGame/ChooseIcon";
import {
  saveToLocalStorageMode,
  GameMode,
  getLocalStorageMode,
} from "@/app/utils/storage";

const HomePage = () => {
  const [isSingleMode, setIsSingleMode] = useState<boolean>(false);
  const [isMultiMode, setIsMultiMode] = useState<boolean>(false);

  useEffect(() => {
    const localStorageMode: GameMode = getLocalStorageMode();

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
    <div>
      {!isMultiMode && !isSingleMode && (
        <div>
          <h1>Tic Tac Toe</h1>
          <div className="wrap-btn-mode">
            <button onClick={() => setIsSingleMode(true)}>Single Player</button>
            <button onClick={() => setIsMultiMode(true)}>Multi Player</button>
          </div>
        </div>
      )}

      {isMultiMode && <MultiGameBoard />}
      {isSingleMode && <ChooseIcon />}
    </div>
  );
};

export default HomePage;

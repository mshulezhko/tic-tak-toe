"use client";
import React, { useState } from "react";
import MultiGameBoard from "../MultiGame/MultiGameBoard";
import ChooseIcon from "../SingleGame/ChooseIcon";

const HomePage = () => {
  const [isSingleMode, setIsSingleMode] = useState<boolean>(false);
  const [isMultiMode, setIsMultiMode] = useState<boolean>(false);

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

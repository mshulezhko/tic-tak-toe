import Link from "next/link";
import React from "react";

type Props = {
  winner: string | null;
  reset: () => void;
  goHome: () => void;
};

const WinnerPopup = ({ winner, reset, goHome }: Props) => {
  return (
    <div className="winner-popup">
      <div>
        <h1>{winner}</h1>
      </div>
      <div className="container-home-btn">
        <button onClick={reset} className="reset play">
          Reset
        </button>
        <Link className="goHome" href="/" onClick={goHome}>
          {" "}
          Home
        </Link>
      </div>
    </div>
  );
};

export default WinnerPopup;

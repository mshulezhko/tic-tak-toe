type winnerType = string | null;

const calculateWinner = (squares: winnerType[]): winnerType => {
  const variants = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < variants.length; i++) {
    const [a, b, c] = variants[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export const whoWonConditions = (
  newWinner: string | null,
  personOne: string | null,
  squares: (string | null)[]
) => {
  if (newWinner) {
    return newWinner === personOne ? "You win! 🥳" : "You lost!";
  }

  if (!newWinner && !squares.filter((el) => !el).length) {
    return "It's a Draw!";
  }

  return null;
};

export default calculateWinner;

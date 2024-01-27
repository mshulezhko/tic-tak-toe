export type GameMode = {
  isSingleMode: boolean;
  isMultiMode: boolean;
};

export type Board = {
  squares: (string | null)[];
  currentPlayer: string | null;
  emoji: null | string;
};

const saveToLocalStorageMode = (mode: GameMode) => {
  localStorage.setItem("userDataMode", JSON.stringify(mode));
};

const getLocalStorageMode = () => {
  const userDataMode = localStorage.getItem("userDataMode");

  if (userDataMode) return JSON.parse(userDataMode);
};

const saveLocalStorageBoard = ({
  squares,
  currentPlayer,
  emoji = null,
}: Board) => {
  localStorage.setItem(
    "localStorageBoard",
    JSON.stringify({ squares, currentPlayer, emoji })
  );
};

const getLocalStorageBoard = () => {
  const localStorageBoard = localStorage.getItem("localStorageBoard");

  if (localStorageBoard) return JSON.parse(localStorageBoard);
};

const checkLocalStorageBoard = () => {
  const localStorageBoard: Board = getLocalStorageBoard();
  const values = localStorageBoard?.squares.filter(
    (element) => element !== null
  );

  if (values?.length) {
    return localStorageBoard;
  }

  return null;
};

const checkLocalStorageEmoji = () => {
  const localStorageBoard: Board = getLocalStorageBoard();

  if (localStorageBoard?.emoji) {
    return localStorageBoard?.emoji;
  }

  return null;
};

const cleanLocalStorage = () => {
  localStorage.removeItem("userDataMode");
  localStorage.removeItem("localStorageBoard");
};

export {
  saveToLocalStorageMode,
  cleanLocalStorage,
  getLocalStorageMode,
  saveLocalStorageBoard,
  getLocalStorageBoard,
  checkLocalStorageBoard,
  checkLocalStorageEmoji,
};

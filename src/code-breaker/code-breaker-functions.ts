import { GameStatus } from '../global/enum/game-status.enum';

export const calculateCodeBreakerKeys = (code: string[], colors: string[]) => {
  const black: number[] = [];
  let white = 0;
  for (let i = 0; i < code.length; i++) {
    if (code[i] == colors[i]) black.push(i);
  }
  for (let i = black.length - 1; i >= 0; i--) {
    code.splice(black[i], 1);
    colors.splice(black[i], 1);
  }
  for (const color of colors) {
    const idx = code.indexOf(color);
    if (idx != -1) {
      code.splice(idx, 1);
      white++;
    }
  }
  return {
    black: black.length,
    white,
  };
};

export const codeBreakerStatus = (
  black: number,
  columns: number,
  guesses: number,
) => {
  if (black === columns) return GameStatus.Won;
  if (guesses >= columns * 2) return GameStatus.Lost;
  return GameStatus.Playing;
};

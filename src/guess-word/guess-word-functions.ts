import { GameStatus } from '../global/enum/game-status.enum';

export const guessWordStatus = (
  green: number,
  length: number,
  guesses: number,
) => {
  if (green === length) return GameStatus.Won;
  if (guesses > Math.ceil((length * 3) / 2)) return GameStatus.Lost;
  return GameStatus.Playing;
};

export const matchGreen = (word: string, green: string[]) => {
  if (noGreen(green)) return true;
  for (let i = 0; i < word.length; i++) {
    if (word[i] && green[i] && word[i] !== green[i]) return false;
  }
  return true;
};

export const matchBrown = (word: string, brown: string[][]) => {
  for (let i = 0; i < word.length; i++) {
    if (word[i] && brown[i] && brown[i].includes(word[i])) return true;
  }
  return false;
};

export const matchGray = (word: string, gray: string[], green: string[]) => {
  const grayCopy = gray.filter((l) => !green.includes(l));
  for (let i = 0; i < word.length; i++) {
    if (grayCopy.includes(word[i])) return true;
  }
  return false;
};

export const noGreen = (green: string[]) => {
  for (const letter of green) {
    if (letter !== '') return false;
  }
  return true;
};

export const includeAllBrown = (word: string, brown: string[][]) => {
  let allBrown: string[] = [];
  allBrown = allBrown.concat.apply([], brown);
  allBrown = [...new Set(allBrown)];
  if (!allBrown.length) return true;
  for (const letter of allBrown) {
    if (!word.includes(letter)) return false;
  }
  return true;
};

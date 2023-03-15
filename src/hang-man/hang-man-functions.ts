import { GameStatus } from '../global/enum/game-status.enum';

const parts: string[] = [
  'head',
  'body',
  'left-arm',
  'right-arm',
  'left-leg',
  'right-leg',
];

const allIncluded = (word: string[], correct: string[]) => {
  const missed = word.filter((l) => !correct.includes(l));
  return missed.length === 0 ? true : false;
};

export const hangManStatus = (
  word: string,
  correct: string[],
  wrong: string[],
) => {
  const letters: string[] = [
    ...new Set(word.split('').filter((l) => l.length === 1)),
  ];
  correct = [...new Set(correct)];
  wrong = [...new Set(wrong)];
  if (allIncluded(letters, correct)) return GameStatus.Won;
  if (wrong.length >= parts.length) return GameStatus.Lost;
  return GameStatus.Playing;
};

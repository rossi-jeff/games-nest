import {
  YachtCategory,
  YachtCategoryArray,
} from '../global/enum/yacht-category.enum';

export class YachtScoreOption {
  Category?: YachtCategory;
  Score?: number;

  toJSON() {
    return {
      Score: this.Score,
      Category: YachtCategoryArray[this.Category],
    };
  }
}

export const scoreNumber = (dice: number[], number: number) => {
  let score = 0;
  for (const die of dice) {
    if (die === number) score += number;
  }
  return score;
};

export const countDieFaces = (dice: number[]) => {
  const faces: { [key: number]: number } = {};
  for (const die of dice) {
    if (!faces[die]) faces[die] = 0;
    faces[die]++;
  }
  return faces;
};

export const scoreFullHouse = (dice: number[]) => {
  const faces: { [key: number]: number } = countDieFaces(dice);
  let score = 0;
  const values = Object.values(faces);
  if (values.length === 2 && values.includes(2) && values.includes(3))
    score = 25;
  return score;
};

export const scoreYacht = (dice: number[]) => {
  const faces: { [key: number]: number } = countDieFaces(dice);
  let score = 0;
  const values = Object.values(faces);
  if (values.length === 1 && values.includes(5)) score = 50;
  return score;
};

export const scoreLittleStraight = (dice: number[]) => {
  let score = 0;
  const sorted = JSON.parse(JSON.stringify(dice));
  sorted.sort();
  if (sorted.join(',') === '1,2,3,4,5') score = 30;
  return score;
};

export const scoreBigStraight = (dice: number[]) => {
  let score = 0;
  const sorted = JSON.parse(JSON.stringify(dice));
  sorted.sort();
  if (sorted.join(',') === '2,3,4,5,6') score = 30;
  return score;
};

export const scoreChoice = (dice: number[]) => {
  let score = 0;
  for (const die of dice) score += die;
  return score;
};

export const scoreFourKind = (dice: number[]) => {
  const faces: { [key: number]: number } = countDieFaces(dice);
  let score = 0;
  const values = Object.values(faces);
  const keys = Object.keys(faces);
  if (values.includes(4) || values.includes(5)) {
    for (const key of keys) {
      if (faces[parseInt(key)] >= 4) score = 4 * parseInt(key);
    }
  }
  return score;
};

export const buildScoreOptions = (dice: number[], skip: string[]) => {
  const options: YachtScoreOption[] = [];
  for (const category of YachtCategoryArray) {
    if (skip.includes(category)) continue;
    const option = new YachtScoreOption();
    option.Score = categoryScore(category, dice);
    option.Category = YachtCategoryArray.indexOf(category);

    options.push(option);
  }
  options.sort(sortByScore);
  return options;
};

export const categoryScore = (category: string, dice: number[]) => {
  const option = new YachtScoreOption();
  option.Score = 0;
  switch (category) {
    case 'Ones':
      option.Score = scoreNumber(dice, 1);
      break;
    case 'Twos':
      option.Score = scoreNumber(dice, 2);
      break;
    case 'Threes':
      option.Score = scoreNumber(dice, 3);
      break;
    case 'Fours':
      option.Score = scoreNumber(dice, 4);
      break;
    case 'Fives':
      option.Score = scoreNumber(dice, 5);
      break;
    case 'Sixes':
      option.Score = scoreNumber(dice, 6);
      break;
    case 'FullHouse':
      option.Score = scoreFullHouse(dice);
      break;
    case 'FourOfKind':
      option.Score = scoreFourKind(dice);
      break;
    case 'BigStraight':
      option.Score = scoreBigStraight(dice);
      break;
    case 'LittleStraight':
      option.Score = scoreLittleStraight(dice);
      break;
    case 'Choice':
      option.Score = scoreChoice(dice);
      break;
    case 'Yacht':
      option.Score = scoreYacht(dice);
      break;
  }
  return option.Score;
};

export const sortByScore = (a: YachtScoreOption, b: YachtScoreOption) =>
  (b.Score ?? 0) - (a.Score ?? 0);

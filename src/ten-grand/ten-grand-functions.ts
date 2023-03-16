import {
  TenGrandCategory,
  TenGrandCategoryArray,
  TenGrandDiceRequired,
} from '../global/enum/ten-grand-category.enum';

class TenGrandOption {
  Category?: TenGrandCategory;
  Score?: number;

  toJSON() {
    return {
      Score: this.Score,
      Category: TenGrandCategoryArray[this.Category],
    };
  }
}

export const countDieFaces = (dice: number[]) => {
  const faces: { [key: number]: number } = {};
  for (const die of dice) {
    if (!faces[die]) faces[die] = 0;
    faces[die]++;
  }
  return faces;
};

export const scoreOnes = (dice: number[]) => {
  let score = 0;
  let count = 0;
  for (const die of dice) {
    if (die === 1) count++;
  }
  if (count) score = count * 100;
  return score;
};

export const scoreFives = (dice: number[]) => {
  let score = 0;
  let count = 0;
  for (const die of dice) {
    if (die === 5) count++;
  }
  if (count) score = count * 50;
  return score;
};

export const scoreFullHouse = (dice: number[]) => {
  let score = 0;
  if (dice.length < 5) return score;
  const faces: { [key: number]: number } = countDieFaces(dice);
  const values = Object.values(faces);
  if (values.includes(2) && values.includes(3)) score = 1500;
  return score;
};

export const scoreStraight = (dice: number[]) => {
  let score = 0;
  const sorted = JSON.parse(JSON.stringify(dice));
  sorted.sort();
  if (sorted.join(',') === '1,2,3,4,5,6') score = 2000;
  return score;
};

export const scoreThreePair = (dice: number[]) => {
  let score = 0;
  if (dice.length != 6) return score;
  const faces: { [key: number]: number } = countDieFaces(dice);
  const values = Object.values(faces);
  if (values.join(',') === '2,2,2') score = 1500;
  return score;
};

export const scoreDoubleThreeKind = (dice: number[]) => {
  let score = 0;
  if (dice.length != 6) return score;
  const faces: { [key: number]: number } = countDieFaces(dice);
  const values = Object.values(faces);
  if (values.join(',') === '3,3') {
    const keys = Object.keys(faces);
    for (const key of keys) {
      if (key === '1') {
        score += 1000;
      } else {
        score += parseInt(key) * 100;
      }
    }
    score = score * 2;
  }
  return score;
};

export const scoreThreeKind = (dice: number[]) => {
  let score = 0;
  if (dice.length < 3) return score;
  const faces: { [key: number]: number } = countDieFaces(dice);
  const keys = Object.keys(faces);
  for (const key of keys) {
    if (faces[parseInt(key)] === 3) {
      if (key === '1') {
        score = 1000;
      } else {
        score = parseInt(key) * 100;
      }
    }
  }
  return score;
};

export const scoreFourKind = (dice: number[]) => {
  let score = 0;
  if (dice.length < 4) return score;
  const faces: { [key: number]: number } = countDieFaces(dice);
  const keys = Object.keys(faces);
  for (const key of keys) {
    if (faces[parseInt(key)] === 4) {
      if (key === '1') {
        score = 2000;
      } else {
        score = parseInt(key) * 200;
      }
    }
  }
  return score;
};

export const scoreFiveKind = (dice: number[]) => {
  let score = 0;
  if (dice.length < 5) return score;
  const faces: { [key: number]: number } = countDieFaces(dice);
  const keys = Object.keys(faces);
  for (const key of keys) {
    if (faces[parseInt(key)] === 5) {
      if (key === '1') {
        score = 4000;
      } else {
        score = parseInt(key) * 400;
      }
    }
  }
  return score;
};

export const scoreSixKind = (dice: number[]) => {
  let score = 0;
  if (dice.length != 6) return score;
  const faces: { [key: number]: number } = countDieFaces(dice);
  const keys = Object.keys(faces);
  for (const key of keys) {
    if (faces[parseInt(key)] === 6) {
      if (key === '1') {
        score = 8000;
      } else {
        score = parseInt(key) * 800;
      }
    }
  }
  return score;
};

export const getTenGrandOptions = (dice: number[]) => {
  const options: TenGrandOption[] = [];
  for (const key of TenGrandCategoryArray) {
    const option = new TenGrandOption();
    option.Score = 0;
    switch (key) {
      case 'Ones':
        option.Category = TenGrandCategory.Ones;
        option.Score = scoreOnes(dice);
        break;
      case 'Fives':
        option.Category = TenGrandCategory.Fives;
        option.Score = scoreFives(dice);
        break;
      case 'ThreePairs':
        option.Category = TenGrandCategory.ThreePairs;
        option.Score = scoreThreePair(dice);
        break;
      case 'Straight':
        option.Category = TenGrandCategory.Straight;
        option.Score = scoreStraight(dice);
        break;
      case 'FullHouse':
        option.Category = TenGrandCategory.FullHouse;
        option.Score = scoreFullHouse(dice);
        break;
      case 'DoubleThreeKind':
        option.Category = TenGrandCategory.DoubleThreeKind;
        option.Score = scoreDoubleThreeKind(dice);
        break;
      case 'ThreeKind':
        option.Category = TenGrandCategory.ThreeKind;
        option.Score = scoreThreeKind(dice);
        break;
      case 'FourKind':
        option.Category = TenGrandCategory.FourKind;
        option.Score = scoreFourKind(dice);
        break;
      case 'FiveKind':
        option.Category = TenGrandCategory.FiveKind;
        option.Score = scoreFiveKind(dice);
        break;
      case 'SixKind':
        option.Category = TenGrandCategory.SixKind;
        option.Score = scoreSixKind(dice);
        break;
      case 'CrapOut':
        option.Category = TenGrandCategory.CrapOut;
        break;
    }
    if (
      (option.Score !== undefined && option.Score > 0) ||
      option.Category === TenGrandCategory.CrapOut
    )
      options.push(option);
  }
  return options;
};

export const diceOnes = (dice: number[]) => {
  const Used: number[] = [];
  for (const face of dice) if (face === 1) Used.push(face);
  return Used;
};

export const diceFives = (dice: number[]) => {
  const Used: number[] = [];
  for (const face of dice) if (face === 5) Used.push(face);
  return Used;
};

export const diceFullHouse = (dice: number[]) => {
  const Used: number[] = [];
  if (dice.length < 5) return Used;
  const faces: { [key: number]: number } = countDieFaces(dice);
  const values = Object.values(faces);
  if (values.includes(2) && values.includes(3)) {
    const keys = Object.keys(faces);
    for (const keyStr of keys) {
      const key = parseInt(keyStr);
      if (faces[key] === 3 || faces[key] === 2) {
        for (let i = 0; i < faces[key]; i++) Used.push(key);
      }
    }
  }
  return Used;
};

export const diceStraight = (dice: number[]) => {
  let Used: number[] = [];
  const sorted = JSON.parse(JSON.stringify(dice));
  sorted.sort();
  if (sorted.join(',') === '1,2,3,4,5,6') Used = [...dice];
  return Used;
};

export const diceThreePair = (dice: number[]) => {
  let Used: number[] = [];
  const faces: { [key: number]: number } = countDieFaces(dice);
  const values = Object.values(faces);
  if (values.join(',') === '2,2,2') Used = [...dice];
  return Used;
};

export const diceDoubleThreeKind = (dice: number[]) => {
  let Used: number[] = [];
  const faces: { [key: number]: number } = countDieFaces(dice);
  const values = Object.values(faces);
  if (values.join(',') === '3,3') Used = [...dice];
  return Used;
};

export const diceThreeKind = (dice: number[]) => {
  const Used: number[] = [];
  const faces: { [key: number]: number } = countDieFaces(dice);
  const keys = Object.keys(faces);
  for (const keyStr of keys) {
    const key = parseInt(keyStr);
    if (faces[key] === 3) {
      for (let i = 0; i < faces[key]; i++) Used.push(key);
    }
  }
  return Used;
};

export const diceFourKind = (dice: number[]) => {
  const Used: number[] = [];
  const faces: { [key: number]: number } = countDieFaces(dice);
  const keys = Object.keys(faces);
  for (const keyStr of keys) {
    const key = parseInt(keyStr);
    if (faces[key] === 4) {
      for (let i = 0; i < faces[key]; i++) Used.push(key);
    }
  }
  return Used;
};

export const diceFiveKind = (dice: number[]) => {
  const Used: number[] = [];
  const faces: { [key: number]: number } = countDieFaces(dice);
  const keys = Object.keys(faces);
  for (const keyStr of keys) {
    const key = parseInt(keyStr);
    if (faces[key] === 5) {
      for (let i = 0; i < faces[key]; i++) Used.push(key);
    }
  }
  return Used;
};

export const diceSixKind = (dice: number[]) => {
  const Used: number[] = [];
  const faces: { [key: number]: number } = countDieFaces(dice);
  const keys = Object.keys(faces);
  for (const keyStr of keys) {
    const key = parseInt(keyStr);
    if (faces[key] === 6) {
      for (let i = 0; i < faces[key]; i++) Used.push(key);
    }
  }
  return Used;
};

export const getCategoryScoreAndDice = (
  category: TenGrandCategory | undefined,
  dice: number[],
) => {
  let Score = 0;
  let Used: number[] = [];
  switch (category.toString()) {
    case 'Ones':
      Score = scoreOnes(dice);
      Used = diceOnes(dice);
      break;
    case 'Fives':
      Score = scoreFives(dice);
      Used = diceFives(dice);
      break;
    case 'ThreePairs':
      Score = scoreThreePair(dice);
      Used = diceThreePair(dice);
      break;
    case 'Straight':
      Score = scoreStraight(dice);
      Used = diceStraight(dice);
      break;
    case 'FullHouse':
      Score = scoreFullHouse(dice);
      Used = diceFullHouse(dice);
      break;
    case 'DoubleThreeKind':
      Score = scoreDoubleThreeKind(dice);
      Used = diceDoubleThreeKind(dice);
      break;
    case 'ThreeKind':
      Score = scoreThreeKind(dice);
      Used = diceThreeKind(dice);
      break;
    case 'FourKind':
      Score = scoreFourKind(dice);
      Used = diceFourKind(dice);
      break;
    case 'FiveKind':
      Score = scoreFiveKind(dice);
      Used = diceFiveKind(dice);
      break;
    case 'SixKind':
      Score = scoreSixKind(dice);
      Used = diceSixKind(dice);
      break;
    case 'CrapOut':
      Used = [...dice];
      break;
  }
  return { Score, Used };
};

export const sortByScore = (a: TenGrandOption, b: TenGrandOption) =>
  (b.Score ?? 0) - (a.Score ?? 0);

export const sortByDicerequired = (a: TenGrandOption, b: TenGrandOption) =>
  (TenGrandDiceRequired[b.Category ?? ''] ?? 0) -
  (TenGrandDiceRequired[a.Category ?? ''] ?? 0);

export enum Color {
  Black = 0,
  Blue = 1,
  Brown = 2,
  Green = 3,
  Orange = 4,
  Purple = 5,
  Red = 6,
  White = 7,
  Yellow = 8,
}

export const ColorArray = Object.keys(Color).filter((k) => isNaN(parseInt(k)));

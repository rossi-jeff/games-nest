export enum Key {
  Black = 0,
  White = 1,
}

export const KeyArray = Object.keys(Key).filter((k) => isNaN(parseInt(k)));

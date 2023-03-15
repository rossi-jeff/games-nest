export const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export const MaxAxis: { H: string[]; V: number[] } = {
  H: alphabet.toUpperCase().split(''),
  V: [...Array(26).keys()].map((x) => x + 1),
};

export const directions = ['N', 'S', 'E', 'W'];

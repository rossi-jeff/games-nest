export enum Navy {
  Player = 0,
  Opponent = 1,
}

export const NavyArray = Object.keys(Navy).filter((k) => isNaN(parseInt(k)));

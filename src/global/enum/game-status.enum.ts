export enum GameStatus {
  Lost = 0,
  Playing = 1,
  Won = 2,
}

export const GameStatusArray = Object.keys(GameStatus).filter((k) =>
  isNaN(parseInt(k)),
);

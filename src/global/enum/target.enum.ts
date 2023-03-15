export enum Target {
  Miss = 0,
  Hit = 1,
  Sunk = 2,
}

export const TargetArray = Object.keys(Target).filter((k) =>
  isNaN(parseInt(k)),
);

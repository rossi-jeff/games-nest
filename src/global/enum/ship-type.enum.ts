export enum ShipType {
  BattleShip = 0,
  Carrier = 1,
  Cruiser = 2,
  PatrolBoat = 3,
  SubMarine = 4,
}

export const ShipTypeSize: { [key: string]: number } = {
  BattleShip: 4,
  Carrier: 5,
  Cruiser: 3,
  PatrolBoat: 2,
  SubMarine: 3,
};

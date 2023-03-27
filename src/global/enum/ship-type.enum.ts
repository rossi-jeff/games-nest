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

export const ShipTypeValue: { [key: string]: ShipType } = {
  BattleShip: ShipType.BattleShip,
  Carrier: ShipType.Carrier,
  Cruiser: ShipType.Cruiser,
  PatrolBoat: ShipType.PatrolBoat,
  SubMarine: ShipType.SubMarine,
};

export const ShipTypeArray = Object.keys(ShipType).filter((k) =>
  isNaN(parseInt(k)),
);

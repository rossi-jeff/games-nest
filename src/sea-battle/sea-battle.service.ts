import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeaBattle } from './sea-battle.entity';
import { Not, Repository } from 'typeorm';
import { SeaBattleTurn } from './sea-battle-turn.entity';
import { SeaBattleShip } from './sea-battle-ship.entity';
import { SeaBattleShipHit } from './sea-battle-ship-hit.entity';
import { SeaBattleShipGridPoint } from './sea-battle-ship-grid-point.entity';
import { defaultLimit, defaultOffset } from '../global/constants';
import { GameStatus } from '../global/enum/game-status.enum';
import { CreateSeaBattleDto } from '../global/dto/create-sea-battle.dto';
import { PointDto, SeaBattleShipDto } from '../global/dto/sea-battle-ship.dto';
import { Navy } from '../global/enum/navy.enum';
import { ShipType } from '../global/enum/ship-type.enum';
import { directions, MaxAxis } from './sea-battle-functions';
import { SeaBattleFireDto } from '../global/dto/sea-battle-fire.dto';
import { Target } from '../global/enum/target.enum';

@Injectable()
export class SeaBattleService {
  constructor(
    @InjectRepository(SeaBattle) private seaBattleRepo: Repository<SeaBattle>,
    @InjectRepository(SeaBattleTurn)
    private seaBattleTurnRepo: Repository<SeaBattleTurn>,
    @InjectRepository(SeaBattleShip)
    private seaBattleShipRepo: Repository<SeaBattleShip>,
    @InjectRepository(SeaBattleShipHit)
    private seaBattleShipHitRepo: Repository<SeaBattleShipHit>,
    @InjectRepository(SeaBattleShipGridPoint)
    private seaBattleShipPointRepo: Repository<SeaBattleShipGridPoint>,
  ) {}

  async paginatedSeaBattles(query: { Limit?: string; Offset?: string }) {
    const { Limit, Offset } = query;
    const take = Limit ? parseInt(Limit) : defaultLimit;
    const skip = Offset ? parseInt(Offset) : defaultOffset;
    const where = { Status: Not(GameStatus.Playing) };
    const Items = await this.seaBattleRepo.find({
      where,
      order: { Score: 'DESC' },
      skip,
      take,
      relations: ['user'],
    });
    const Count = await this.seaBattleRepo.count({ where });
    return { Items, Count, Limit: take, Offset: skip };
  }

  async inProgressSeaBattles(user_id?: number) {
    if (user_id) {
      return await this.seaBattleRepo.find({
        where: {
          user_id,
          Status: GameStatus.Playing,
        },
        relations: ['ships'],
      });
    } else return [];
  }

  async getSeaBattleById(id: number) {
    return await this.seaBattleRepo.findOne({
      where: { id },
      relations: ['user', 'turns', 'ships', 'ships.points', 'ships.hits'],
    });
  }

  async getSeaBattleShipById(id: number) {
    return await this.seaBattleShipRepo.findOne({
      where: { id },
      relations: ['points', 'hits'],
    });
  }

  async createSeaBattle(dto: CreateSeaBattleDto, user_id?: number) {
    const { Axis } = dto;
    const sea_battle = new SeaBattle();
    const now = new Date().toISOString();
    sea_battle.Axis = Axis;
    sea_battle.user_id = user_id || null;
    sea_battle.created_at = now;
    sea_battle.updated_at = now;
    const saved = await this.seaBattleRepo.save(sea_battle);
    return await this.getSeaBattleById(saved.id);
  }

  async seaBattleShip(dto: SeaBattleShipDto, id: number) {
    const { Navy: navy, ShipType: shipType, Size } = dto;
    let ship;
    if (navy.toString() == 'Opponent') {
      ship = await this.createOpponentShip(id, shipType, Size);
    } else {
      const { Points } = dto;
      ship = await this.createPlayerShip(id, shipType, Size, Points);
    }
    return ship;
  }

  async seaBattleFire(dto: SeaBattleFireDto, id: number) {
    const { Navy: navy } = dto;
    let turn;
    if (navy.toString() == 'Opponent') {
      turn = await this.createOpponentTurn(id);
    } else {
      const { Horizontal, Vertical } = dto;
      turn = await this.createPlayerTurn(id, Horizontal, Vertical);
    }
    const status = await this.seabattleStatus(id);
    if (status != GameStatus.Playing) {
      const Score = await this.seaBattleScore(id, status);
      await this.seaBattleRepo
        .createQueryBuilder()
        .update(SeaBattle)
        .set({ Score, Status: status })
        .where('id = :id', { id })
        .execute();
    }
    return turn;
  }

  async seaBattleScore(id: number, status: GameStatus) {
    const sea_battle = await this.seaBattleRepo.findOne({ where: { id } });
    if (!sea_battle || !sea_battle.Axis) return 0;
    const maxTurns = sea_battle.Axis * sea_battle.Axis * 2;
    const perMiss = 5;
    const perHit = 10;
    let Score = status === GameStatus.Won ? maxTurns * perMiss : 0;
    const turns = await this.seaBattleTurnRepo.find({
      where: { sea_battle_id: id },
    });
    for (const turn of turns) {
      Score -= perMiss;
      if (turn.Navy == Navy.Player) {
        if (turn.Target === Target.Hit) Score += perHit;
        if (turn.Target === Target.Miss) Score -= perMiss;
        if (turn.Target === Target.Sunk) Score += perHit * 2;
      } else {
        if (turn.Target === Target.Hit) Score -= perHit;
        if (turn.Target === Target.Miss) Score += perMiss;
        if (turn.Target === Target.Sunk) Score -= perHit * 2;
      }
    }
    return Score;
  }

  async seabattleStatus(id: number) {
    const ships = await this.seaBattleShipRepo.find({
      where: { sea_battle_id: id },
    });
    const sunk: { [key: string]: boolean } = {
      player: true,
      opponent: true,
    };
    for (const ship of ships) {
      if (ship.Navy == Navy.Player) {
        if (!ship.Sunk) sunk.player = false;
      } else {
        if (!ship.Sunk) sunk.opponent = false;
      }
    }
    if (sunk.player) return GameStatus.Lost;
    if (sunk.opponent) return GameStatus.Won;
    return GameStatus.Playing;
  }

  async createOpponentTurn(id: number) {
    const result = await this.getOpponentFirePoint(id);
    const { Horizontal, Vertical } = result;
    if (!Horizontal || !Vertical) return null;
    return await this.createTurn(id, Navy.Opponent, Horizontal, Vertical);
  }

  async getOpponentFirePoint(id) {
    const sea_battle = await this.seaBattleRepo.findOne({ where: { id } });
    const horizontalAxis = MaxAxis.H.slice(0, sea_battle.Axis);
    const verticalAxis = MaxAxis.V.slice(0, sea_battle.Axis);
    const points: PointDto[] = [];
    for (const Horizontal of horizontalAxis) {
      for (const Vertical of verticalAxis) {
        points.push({ Horizontal, Vertical });
      }
    }
    const turns = await this.seaBattleTurnRepo.find({
      where: { sea_battle_id: id, Navy: Navy.Opponent },
    });
    let idx: number;
    for (const turn of turns) {
      idx = points.findIndex(
        (p) => p.Horizontal == turn.Horizontal && p.Vertical == turn.Vertical,
      );
      if (idx != -1) points.splice(idx, 1);
    }
    return points[Math.floor(Math.random() * points.length)];
  }

  async createPlayerTurn(id: number, Horizontal?: string, Vertical?: number) {
    if (!Horizontal || !Vertical) return null;
    return await this.createTurn(id, Navy.Player, Horizontal, Vertical);
  }

  async createTurn(
    id: number,
    navy: Navy,
    Horizontal: string,
    Vertical: number,
  ) {
    const { target, shipType } = await this.checkForHits(
      id,
      navy,
      Horizontal,
      Vertical,
    );
    const turn = new SeaBattleTurn();
    const now = new Date().toISOString();
    turn.sea_battle_id = id;
    turn.Navy = navy;
    turn.Horizontal = Horizontal;
    turn.Vertical = Vertical;
    turn.Target = target;
    turn.ShipType = shipType;
    turn.created_at = now;
    turn.updated_at = now;
    return await this.seaBattleTurnRepo.save(turn);
  }

  async checkForHits(
    id: number,
    navy: Navy,
    Horizontal: string,
    Vertical: number,
  ) {
    const ships = await this.seaBattleShipRepo.find({
      where: { sea_battle_id: id, Navy: Not(navy) },
      relations: ['points', 'hits'],
    });
    let target = Target.Miss;
    let shipType = null;
    const now = new Date().toISOString();
    for (const ship of ships) {
      for (const point of ship.points) {
        if (point.Horizontal == Horizontal && point.Vertical == Vertical) {
          target = Target.Hit;
          shipType = ship.Type;
          const hit = new SeaBattleShipHit();
          hit.sea_battle_ship_id = ship.id;
          hit.Horizontal = Horizontal;
          hit.Vertical = Vertical;
          hit.created_at = now;
          hit.updated_at = now;
          await this.seaBattleShipHitRepo.save(hit);
          if (ship.hits.length + 1 >= ship.Size) {
            target = Target.Sunk;
            await this.seaBattleShipRepo
              .createQueryBuilder()
              .update(SeaBattleShip)
              .set({ Sunk: true })
              .where('id = :id', { id: ship.id })
              .execute();
          }
        }
      }
    }
    return { target, shipType };
  }

  async createOpponentShip(id: number, shipType: ShipType, Size: number) {
    const ship = new SeaBattleShip();
    const now = new Date().toISOString();
    ship.sea_battle_id = id;
    ship.Navy = Navy.Opponent;
    ship.Size = Size;
    ship.Type = shipType;
    ship.created_at = now;
    ship.updated_at = now;
    const saved = await this.seaBattleShipRepo.save(ship);
    const points: PointDto[] = await this.opponentShipPoints(id, Size);
    for (const point of points) {
      const { Horizontal, Vertical } = point;
      const grid_point = new SeaBattleShipGridPoint();
      grid_point.sea_battle_ship_id = saved.id;
      grid_point.Horizontal = Horizontal;
      grid_point.Vertical = Vertical;
      grid_point.created_at = now;
      grid_point.updated_at = now;
      await this.seaBattleShipPointRepo.save(grid_point);
    }
    return await this.getSeaBattleShipById(saved.id);
  }

  async opponentShipPoints(id: number, size: number) {
    let points: PointDto[] = [];
    const sea_battle = await this.seaBattleRepo.findOne({ where: { id } });
    if (!sea_battle) return points;
    const horizontalAxis = MaxAxis.H.slice(0, sea_battle.Axis);
    const verticalAxis = MaxAxis.V.slice(0, sea_battle.Axis);
    const occupied: PointDto[] = [];
    const ships = await this.seaBattleShipRepo.find({
      where: { sea_battle_id: id, Navy: Navy.Opponent },
      relations: ['points'],
    });
    for (const ship of ships) {
      for (const point of ship.points) {
        const { Horizontal, Vertical } = point;
        occupied.push({ Horizontal, Vertical });
      }
    }
    let idxH: number, idxV: number, count: number, direction: string;
    while (points.length < size) {
      idxH = Math.floor(Math.random() * sea_battle.Axis);
      idxV = Math.floor(Math.random() * sea_battle.Axis);
      count = 0;
      points = [];
      direction = directions[Math.floor(Math.random() * directions.length)];
      while (count < size) {
        if (idxH < 0 || idxH >= sea_battle.Axis) break;
        if (idxV < 0 || idxV >= sea_battle.Axis) break;
        if (
          occupied.find(
            (p) =>
              p.Horizontal == horizontalAxis[idxH] &&
              p.Vertical == verticalAxis[idxV],
          )
        )
          break;
        points.push({
          Horizontal: horizontalAxis[idxH],
          Vertical: verticalAxis[idxV],
        });
        count++;
        switch (direction) {
          case 'N':
            idxV--;
            break;
          case 'S':
            idxV++;
            break;
          case 'E':
            idxH++;
            break;
          case 'W':
            idxH--;
            break;
        }
      }
    }
    return points;
  }

  async createPlayerShip(
    id: number,
    shipType: ShipType,
    Size: number,
    points?: PointDto[],
  ) {
    const ship = new SeaBattleShip();
    const now = new Date().toISOString();
    ship.sea_battle_id = id;
    ship.Navy = Navy.Player;
    ship.Size = Size;
    ship.Type = shipType;
    ship.created_at = now;
    ship.updated_at = now;
    const saved = await this.seaBattleShipRepo.save(ship);
    if (saved && points && points.length > 0) {
      for (const point of points) {
        const { Horizontal, Vertical } = point;
        const grid_point = new SeaBattleShipGridPoint();
        grid_point.sea_battle_ship_id = saved.id;
        grid_point.Horizontal = Horizontal;
        grid_point.Vertical = Vertical;
        grid_point.created_at = now;
        grid_point.updated_at = now;
        await this.seaBattleShipPointRepo.save(grid_point);
      }
    }
    return await this.getSeaBattleShipById(saved.id);
  }
}

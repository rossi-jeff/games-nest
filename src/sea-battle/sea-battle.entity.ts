import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from '../global/base-model.abstract';
import { GameStatus } from '../global/enum/game-status.enum';
import { User } from '../user/user.entity';
import { SeaBattleShip } from './sea-battle-ship.entity';
import { SeaBattleTurn } from './sea-battle-turn.entity';

@Entity()
export class SeaBattle extends BaseModel {
  @Column({ type: 'enum', enum: GameStatus })
  Status: GameStatus;

  @Column({ type: 'int', default: 0 })
  Score: number;

  @Column({ type: 'int', default: 8 })
  Axis: number;

  @Column({ type: 'bigint', nullable: true })
  user_id: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany((type) => SeaBattleShip, (gwg) => gwg.sea_battle)
  ships: SeaBattleShip[];

  @OneToMany((type) => SeaBattleTurn, (gwg) => gwg.sea_battle)
  turns: SeaBattleTurn[];
}

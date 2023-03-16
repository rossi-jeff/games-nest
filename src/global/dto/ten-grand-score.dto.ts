import { TenGrandCategory } from '../enum/ten-grand-category.enum';

export class TenGrandScoreDto {
  TurnId: number;
  Dice: number[];
  Options: { Score?: number; Category?: TenGrandCategory }[];
}

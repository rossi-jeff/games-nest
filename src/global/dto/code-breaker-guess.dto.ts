import { ApiProperty } from '@nestjs/swagger';
import { Color, ColorArray } from '../enum/color.enum';

export class CodeBreakerGuessDto {
  @ApiProperty({ type: 'array', items: { enum: ColorArray } })
  Colors: Color[];
}

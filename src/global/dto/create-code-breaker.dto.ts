import { ApiProperty } from '@nestjs/swagger';
import { Color, ColorArray } from '../enum/color.enum';

export class CreateCodeBreakerDto {
  @ApiProperty({ type: 'array', items: { enum: ColorArray } })
  Colors: Color[];

  @ApiProperty()
  Columns: number;
}

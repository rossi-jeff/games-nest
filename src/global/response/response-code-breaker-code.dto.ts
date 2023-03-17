import { ApiProperty } from '@nestjs/swagger';
import { Color, ColorArray } from '../enum/color.enum';
import { ResponseBaseModelDto } from './response-base-model.dto';

export class ResponseCodeBreakerCodeDto extends ResponseBaseModelDto {
  @ApiProperty({ enum: ColorArray })
  Color: Color;
}

import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class UnidadeWhereQueryDto {
  @Type(() => Number)
  @IsInt()
  unidade_tipo_id?: number;
}

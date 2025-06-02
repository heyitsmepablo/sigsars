import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class UnidadeWhereQueryDto {
  @Type(() => Number)
  @IsInt()
  tipo_unidade_id?: number;
}

import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class UnidadeWhereQueryDto {
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  unidade_tipo_id?: number;
}

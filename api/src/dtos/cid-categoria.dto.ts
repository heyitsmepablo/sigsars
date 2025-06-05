import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class CidCategoriaWhereQueryDto {
  @Type(() => Number)
  @IsInt()
  cid_grupo_id: number;
}

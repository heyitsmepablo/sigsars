import { IsEnum, IsOptional } from 'class-validator';

enum tipo_causa {
  EXTERNA = 'EXTERNA',
  QUEIXA = 'QUEIXA',
}
export class CausaWhereQueryDto {
  @IsOptional()
  @IsEnum({ EXTERNA: 'EXTERNA', QUEIXA: 'QUEIXA' })
  tipo?: tipo_causa;
}

import { IsEnum, IsOptional, IsString } from 'class-validator';
import { $Enums } from 'generated/prisma';
enum tipo_causa {
  EXTERNA = 'EXTERNA',
  QUEIXA = 'QUEIXA',
}
export class CausaWhereQueryDto {
  @IsOptional()
  @IsEnum({ EXTERNA: 'EXTERNA', QUEIXA: 'QUEIXA' })
  tipo?: tipo_causa;
}

import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsDateString, IsInt } from 'class-validator';
import { Prisma } from 'generated/prisma';

export class BoletimInternacaoOcupacaoServiceCreateArgs {
  unidade_id: number;
  usuario_responsavel_preenchimento_id: string;
  referente_ao_dia: Date;
  pacientes_uti: number;
  pacientes_uti_isolamento: number;
  pacientes_enfermaria: number;
  pacientes_enfermaria_isolamento: number;
  pacientes_lsvp: number;
  pacientes_estabilizacao_vermelha: number;
}

export class BoletimInternacaoOcupacaoCreateDto {
  @Type(() => Number)
  @IsInt()
  unidade_id: number;
  @IsDateString()
  referente_ao_dia: Date;
  @ApiHideProperty()
  usuario_responsavel_preenchimento_id: string;
  @Type(() => Number)
  @IsInt()
  pacientes_uti: number;
  @Type(() => Number)
  @IsInt()
  pacientes_uti_isolamento: number;
  @Type(() => Number)
  @IsInt()
  pacientes_enfermaria: number;
  @Type(() => Number)
  @IsInt()
  pacientes_enfermaria_isolamento: number;
  @Type(() => Number)
  @IsInt()
  pacientes_lsvp: number;
  @Type(() => Number)
  @IsInt()
  pacientes_estabilizacao_vermelha: number;
}

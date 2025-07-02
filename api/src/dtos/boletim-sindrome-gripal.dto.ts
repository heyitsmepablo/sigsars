import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsUUID } from 'class-validator';

export class BoletimSindromeGripalServiceCreateArgs {
  unidade_id: number;
  referente_ao_dia: Date;
  usuario_responsavel_preenchimento_id: string;
  total_atendimentos_sd_com_queixa_gripal: number;
  total_atendimentos_sd_sem_queixa_gripal: number;
  total_atendimentos_sn_com_queixa_gripal: number;
  total_atendimentos_sn_sem_queixa_gripal: number;
  total_internacoes_apos_atendimento_urgencia_com_queixa_gripal: number;
  total_internacoes_apos_atendimento_urgencia_sem_queixa_gripal: number;
  total_obitos: number;
  total_transferencias: number;
}

export class BoletimSindromeGripalCreateDto {
  @Type(() => Number)
  @IsInt()
  unidade_id: number;
  @IsDateString()
  referente_ao_dia: Date;
  @ApiHideProperty()
  usuario_responsavel_preenchimento_id: string;
  @Type(() => Number)
  @IsInt()
  total_atendimentos_sd_com_queixa_gripal: number;
  @Type(() => Number)
  @IsInt()
  total_atendimentos_sd_sem_queixa_gripal: number;
  @Type(() => Number)
  @IsInt()
  total_atendimentos_sn_com_queixa_gripal: number;
  @Type(() => Number)
  @IsInt()
  total_atendimentos_sn_sem_queixa_gripal: number;
  @Type(() => Number)
  @IsInt()
  total_internacoes_apos_atendimento_urgencia_com_queixa_gripal: number;
  @Type(() => Number)
  @IsInt()
  total_internacoes_apos_atendimento_urgencia_sem_queixa_gripal: number;
  @Type(() => Number)
  @IsInt()
  total_obitos: number;
  @Type(() => Number)
  @IsInt()
  total_transferencias: number;
}

import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsInt, IsUUID } from 'class-validator';
import { Prisma } from 'generated/prisma';

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
  @ApiHideProperty()
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

export class BoletimSindromeGripalFindAllResponse
  implements
    Prisma.boletim_sindrome_gripalGetPayload<{
      select: {
        id: true;
        unidade: { select: { id: true; nome: true } };
        usuario: { omit: { usuario_tipo_id: true } };
        referente_ao_dia: true;
        criado_em: true;
        atualizado_em: true;
      };
    }>
{
  referente_ao_dia: Date;
  id: number;
  unidade: { id: number; nome: string };
  usuario: {
    id: string;
    criado_em: Date | null;
    atualizado_em: Date | null;
    nome: string;
    cargo: string;
    matricula: string;
    unidade_lotada_id: number;
    cpf: string;
    email: string | null;
  } | null;
  criado_em: Date | null;
  atualizado_em: Date | null;
}

export class BoletimSindromeGripalFindOneResponse
  implements
    Prisma.boletim_sindrome_gripalGetPayload<{
      include: {
        usuario: { select: { nome: true; cargo: true; matricula: true } };
        unidade: { select: { nome: true; sigla: true } };
      };
    }>
{
  id: number;
  unidade: { nome: string; sigla: string | null };
  usuario: { nome: string; cargo: string; matricula: string } | null;
  unidade_id: number;
  referente_ao_dia: Date;
  usuario_responsavel_preenchimento_id: string | null;
  total_atendimentos_sd_com_queixa_gripal: number;
  total_atendimentos_sd_sem_queixa_gripal: number;
  total_atendimentos_sn_com_queixa_gripal: number;
  total_atendimentos_sn_sem_queixa_gripal: number;
  total_internacoes_apos_atendimento_urgencia_com_queixa_gripal: number;
  total_internacoes_apos_atendimento_urgencia_sem_queixa_gripal: number;
  total_obitos: number;
  total_transferencias: number;
  criado_em: Date | null;
  atualizado_em: Date | null;
}

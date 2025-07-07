import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { $Enums } from 'generated/prisma';

class FichaSpaRecepcao {
  @IsDateString()
  hora_da_recepcao: Date;

  @IsBoolean()
  nao_identificado: boolean;

  @IsString()
  nome_paciente: string;

  @IsEnum($Enums.tipo_genero)
  genero: $Enums.tipo_genero = 'M';

  @IsDateString()
  data_de_nascimento: Date;

  @IsString()
  cartao_sus_ou_cpf: string;

  @IsInt()
  municipio_rg_id: number;

  @IsEnum($Enums.tipo_raca_cor)
  raca_cor: $Enums.tipo_raca_cor = 'BRANCA';

  @IsEnum($Enums.tipo_origem)
  procedencia: $Enums.tipo_origem = 'DEMANDA_ESPONTANEA_SAO_LUIS';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  municipio_procedencia_interior_id: number | null;
}

class FichaSpaDoencaPrexistente {
  @IsBoolean()
  has: boolean;

  @IsBoolean()
  dm: boolean;

  @IsBoolean()
  drc: boolean;

  @IsOptional()
  @IsString()
  outros: string | null;
}

class FichaSpaProtocoloECondicaoEspecial {
  @IsBoolean()
  sepse: boolean;

  @IsBoolean()
  dor_toracica: boolean;

  @IsBoolean()
  avc: boolean;

  @IsBoolean()
  notificacao: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  notificacao_agravo_id: number | null;
}

class FichaSpaEncaminhamento {
  @IsEnum($Enums.tipo_encaminhamento)
  encaminhado_para_1: $Enums.tipo_encaminhamento = 'ESTABILIZACAO';

  @IsEnum($Enums.tipo_encaminhamento)
  encaminhado_para_2: $Enums.tipo_encaminhamento = 'ECG';

  @IsOptional()
  @IsDateString()
  hora_da_realizacao_ecg: Date | null;
}

class FichaSpaQueixa {
  @IsInt()
  causa_id: number;
}

class FichaSpaClassificacao {
  @IsDateString()
  hora_da_classificacao: Date;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  causa_externa_id: number | undefined;

  @IsBoolean()
  retornou_com_menos_ou_igual_48h: boolean;

  @ValidateNested()
  @Type(() => FichaSpaDoencaPrexistente)
  doenca_prexistente: FichaSpaDoencaPrexistente;

  @ValidateNested()
  @Type(() => FichaSpaProtocoloECondicaoEspecial)
  protocolo_e_condicao_especial: FichaSpaProtocoloECondicaoEspecial;

  @ValidateNested()
  @Type(() => FichaSpaEncaminhamento)
  encaminhamento: FichaSpaEncaminhamento;

  @IsEnum($Enums.tipo_manchester)
  manchester: $Enums.tipo_manchester = 'VERMELHO';

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FichaSpaQueixa)
  queixa: FichaSpaQueixa[];
}

class FichaSpaExameSolicitado {
  @IsBoolean()
  raio_x: boolean;

  @IsBoolean()
  tomografia: boolean;

  @IsBoolean()
  ecg: boolean;

  @IsBoolean()
  ultrassonografia: boolean;

  @IsBoolean()
  laboratorio: boolean;
}

class FichaSpaAtendimentoMedico {
  @IsDateString()
  horario_do_atendimento_medico: Date;

  @ValidateNested()
  @Type(() => FichaSpaExameSolicitado)
  exame_solicitado: FichaSpaExameSolicitado;
}

class FichaSpaPlanoTerapeutico {
  @IsDateString()
  horario_do_atendimento_na_medicacao_observacao: Date;
}

class FichaSpaDestinoFinalDoPaciente {
  @IsDateString()
  horario_da_saida: Date;

  @IsEnum($Enums.tipo_destino_final)
  destino_final: $Enums.tipo_destino_final = 'ALTA';

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  unidade_transferida_id: number;
  @IsOptional()
  @IsDateString()
  horario_da_saida_para_o_sertor_de_internacao: Date;
}

export class FichaSpaCreateDto {
  @ApiHideProperty()
  usuario_responsavel_preenchimento_id: string;

  @ApiHideProperty()
  unidade_id: number;

  @IsDateString()
  data_da_ficha: Date;

  @ValidateNested()
  @Type(() => FichaSpaRecepcao)
  recepcao: FichaSpaRecepcao;

  @ValidateNested()
  @Type(() => FichaSpaClassificacao)
  classificacao: FichaSpaClassificacao;

  @ValidateNested()
  @Type(() => FichaSpaAtendimentoMedico)
  atendimento_medico: FichaSpaAtendimentoMedico;

  @ValidateNested()
  @Type(() => FichaSpaPlanoTerapeutico)
  plano_terapeutico: FichaSpaPlanoTerapeutico;

  @ValidateNested()
  @Type(() => FichaSpaDestinoFinalDoPaciente)
  destino_final_do_paciente: FichaSpaDestinoFinalDoPaciente;
}

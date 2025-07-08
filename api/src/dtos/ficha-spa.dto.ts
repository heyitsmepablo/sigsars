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
import { $Enums, Prisma } from 'generated/prisma';

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

  @IsString()
  numero_da_ficha: string;

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

export class FichaSpaFindOneResponse
  implements
    Prisma.ficha_spaGetPayload<{
      select: {
        id: true;
        numero_da_ficha: true;
        usuario: { select: { nome: true } };
        data_da_ficha: true;
        unidade: { select: { id: true; nome: true; sigla: true } };
        ficha_spa_recepcao: {
          select: {
            nome_paciente: true;
            raca_cor: true;
            procedencia: true;
            nao_identificado: true;
            hora_da_recepcao: true;
            genero: true;
            data_de_nascimento: true;
            cartao_sus_ou_cpf: true;
            criado_em: true;
            atualizado_em: true;
            municipio_procedencia_interior: {
              select: {
                id: true;
                nome: true;
                estado: { select: { id: true; nome: true; uf: true } };
              };
            };
            municipio_rg: {
              select: {
                id: true;
                nome: true;
                estado: { select: { id: true; nome: true; uf: true } };
              };
            };
          };
        };
        ficha_spa_classificacao: {
          select: {
            hora_da_classificacao: true;
            causa: true;
            retornou_com_menos_ou_igual_48h: true;
            ficha_spa_doenca_preexistente: true;
            ficha_spa_encaminhamento: true;
            ficha_spa_protocolo_e_condicao_especial: true;
            manchester: true;
          };
        };
        ficha_spa_atendimento_medico: true;
        ficha_spa_plano_terapeutico: true;
        ficha_spa_destino_final_do_paciente: true;
        criado_em: true;
        atualizado_em: true;
      };
    }>
{
  numero_da_ficha: string;
  data_da_ficha: Date;
  id: number;
  usuario: { nome: string };
  unidade: { id: number; nome: string; sigla: string | null };
  ficha_spa_recepcao: {
    hora_da_recepcao: Date;
    nao_identificado: boolean | null;
    nome_paciente: string | null;
    genero: $Enums.tipo_genero | null;
    data_de_nascimento: Date | null;
    cartao_sus_ou_cpf: string | null;
    raca_cor: $Enums.tipo_raca_cor | null;
    procedencia: $Enums.tipo_origem | null;
    criado_em: Date | null;
    atualizado_em: Date | null;
    municipio_procedencia_interior: {
      id: number;
      nome: string;
      estado: { id: number; nome: string; uf: string };
    } | null;
    municipio_rg: {
      id: number;
      nome: string;
      estado: { id: number; nome: string; uf: string };
    } | null;
  }[];
  ficha_spa_classificacao: {
    hora_da_classificacao: Date;
    retornou_com_menos_ou_igual_48h: boolean;
    manchester: $Enums.tipo_manchester;
    causa: {
      id: number;
      criado_em: Date | null;
      atualizado_em: Date | null;
      nome: string | null;
      tipo: $Enums.tipo_causa | null;
    } | null;
    ficha_spa_doenca_preexistente: {
      has: boolean;
      dm: boolean;
      drc: boolean;
      outros: string | null;
      id: number;
      criado_em: Date | null;
      atualizado_em: Date | null;
      ficha_spa_classificacao_id: number;
    }[];
    ficha_spa_encaminhamento: {
      encaminhado_para_1: $Enums.tipo_encaminhamento;
      encaminhado_para_2: $Enums.tipo_encaminhamento;
      hora_da_realizacao_ecg: Date | null;
      id: number;
      criado_em: Date | null;
      atualizado_em: Date | null;
      ficha_spa_classificacao_id: number | null;
    }[];
    ficha_spa_protocolo_e_condicao_especial: {
      sepse: boolean;
      dor_toracica: boolean;
      avc: boolean;
      notificacao: boolean;
      notificacao_agravo_id: number | null;
      id: number;
      criado_em: Date | null;
      atualizado_em: Date | null;
      ficha_spa_classificacao_id: number;
    }[];
  }[];
  ficha_spa_atendimento_medico: {
    horario_do_atendimento_medico: Date;
    id: number;
    criado_em: Date | null;
    atualizado_em: Date | null;
    ficha_spa_id: number;
  }[];
  ficha_spa_plano_terapeutico: {
    horario_do_atendimento_na_medicacao_observacao: Date | null;
    id: number;
    criado_em: Date | null;
    atualizado_em: Date | null;
    ficha_spa_id: number;
  }[];
  ficha_spa_destino_final_do_paciente: {
    horario_da_saida: Date | null;
    destino_final: $Enums.tipo_destino_final | null;
    unidade_transferida_id: number | null;
    id: number;
    criado_em: Date | null;
    atualizado_em: Date | null;
    ficha_spa_id: number;
    horario_da_saida_para_o_setor_de_internacao: Date | null;
  }[];
  criado_em: Date | null;
  atualizado_em: Date | null;
}

export class FichaSpaFindAllResponse
  implements
    Prisma.ficha_spaGetPayload<{
      select: {
        id: true;
        numero_da_ficha: true;
        data_da_ficha: true;
        unidade: {
          select: { id: true; nome: true; sigla: true };
        };
        usuario: { select: { id: true; nome: true } };
        criado_em: true;
        atualizado_em: true;
      };
    }>
{
  numero_da_ficha: string;
  data_da_ficha: Date;
  id: number;
  usuario: { id: string; nome: string };
  unidade: { id: number; nome: string; sigla: string | null };
  criado_em: Date | null;
  atualizado_em: Date | null;
}

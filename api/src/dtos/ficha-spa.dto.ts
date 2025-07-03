import { Type } from 'class-transformer';
import { IsInt, IsUUID } from 'class-validator';
import { $Enums } from 'generated/prisma';

enum tipo_genero {
  M = 'M',
  F = 'F',
}

class FichaSpaRecepcao {
  hora_da_recepcao: string;
  nao_identificado: boolean;
  nome_paciente: string;
  genero: $Enums.tipo_genero;
  data_de_nascimento: Date;
  cartao_sus_ou_cpf: string;
  municipio_rg_id: number;
  raca_cor: $Enums.tipo_raca_cor;
  procedencia: $Enums.tipo_origem;
  municipio_procedencia_interior_id: number | null;
}

class FichaSpaDoencaPrexistente {
  has: boolean;
  dm: boolean;
  drc: boolean;
  outros: string | null;
}

class FichaSpaProtocoloECondicaoEspecial {
  sepse: boolean;
  dor_toracica: boolean;
  avc: boolean;
  notificacao: boolean;
  notificacao_agravo_id: number | null;
}

class FichaSpaEncaminhamento {}

export class FichaSpaCreateInput {
  @IsUUID()
  usuario_responsavel_preenchimento_id: string;
  @Type(() => Number)
  @IsInt()
  unidade_id: number;
  data_da_ficha: Date;
  ficha_spa_recepcao: FichaSpaRecepcao;
  ficha_spa_classificacao: {
    hora_da_classificacao: string;
    cauxar_externa_id: number | null;
    retornou_com_menos_ou_igual_48h: boolean;
    ficha_spa_doenca_prexistente: FichaSpaDoencaPrexistente;
    ficha_spa_protocolo_e_condicao_especial: FichaSpaProtocoloECondicaoEspecial;
    ficha_spa_encaminhamento: {
      encaminhado_para_1: $Enums.tipo_encaminhamento;
      encaminhado_para_2: $Enums.tipo_encaminhamento;
      hora_da_realizacao_ecg: string | null;
    };
    manchester: $Enums.tipo_manchester;
    ficha_spa_queixa: { causa_id: number }[];
  };
  ficha_spa_atendimento_medico: {
    horario_do_atendimento_medico: string;
    ficha_spa_exame_solicitado: {
      raio_x: boolean;
      tomografia: boolean;
      ecg: boolean;
      ultrassonografia: boolean;
      laboratorio: boolean;
    };
  };
  ficha_spa_plano_terapeutico: {
    horario_do_atendimento_na_medicacao_observacao: string;
  };
  ficha_spa_destino_final_do_paciente: {
    horario_da_saida: string;
    destino_final: $Enums.tipo_destino_final;
    unidade_transferida_id: number;
    horario_da_saida_para_o_sertor_de_Internacao: string;
  };
}

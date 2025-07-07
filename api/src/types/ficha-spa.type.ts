import { Prisma } from 'generated/prisma';

export type FichaSpaFindOneResponse = Prisma.ficha_spaGetPayload<{
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
}>;

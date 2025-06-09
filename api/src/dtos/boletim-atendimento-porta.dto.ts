import { $Enums } from 'generated/prisma';

class BoletimAtendimentoPortaData {
  unidade_id: number;
  referente_ao_dia: string | Date;
  usuario_responsavel_preenchimento_id: string;
}

class BoletimAtendimentoPortaItemData {
  origem: $Enums.tipo_origem_atendimento_porta;
  turno: $Enums.tipo_turno;
  numero_de_atendimentos: number;
  causa_id: number;
  genero: $Enums.tipo_genero;
  faixa_etaria: string;
}

export class BoletimAtendimentoPortaServiceCreateArgs {
  boletim: BoletimAtendimentoPortaData;
  items: BoletimAtendimentoPortaItemData[];
}

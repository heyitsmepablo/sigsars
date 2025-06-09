import { $Enums } from 'generated/prisma';

class BoletimSaida {
  unidade_id: number;
  referente_ao_dia: string | Date;
  usuario_responsavel_preenchimento_id: string;
}
class BoletimSaidaItem {
  boletim_saida_id: number;
  local_de_saida: $Enums.tipo_local_de_saida;
  tipo_da_saida: $Enums.tipo_saida;
  unidade_destino_id: number;
  leito_de_destino: $Enums.tipo_leito_de_destino;
  total_de_saida: number;
}
export class BoletimSaidaServiceCreateArgs {
  boletim: BoletimSaida;
  items: BoletimSaidaItem[];
}

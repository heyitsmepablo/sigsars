import { $Enums, Prisma } from 'generated/prisma';

class BoletimInternacaoAdmissaoData {
  unidade_id: number;
  referente_ao_dia: string | Date;
  usuario_responsavel_preenchimento_id: string;
}
class BoletimInternacaoAdmissaoItemData {
  boletim_internacao_admissao_id: number;
  numero_de_admissoes: number;
  cid_id: number;
  faixa_etaria: string;
  genero: $Enums.tipo_genero;
}
export class BoletimInternacaoAdmissaoServiceCreateArgs {
  boletim: BoletimInternacaoAdmissaoData;
  items: BoletimInternacaoAdmissaoItemData[];
}

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

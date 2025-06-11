import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsInt } from 'class-validator';
import { $Enums } from 'generated/prisma';

class BoletimSaidaItem {
  boletim_saida_id: number;
  local_de_saida: $Enums.tipo_local_de_saida;
  tipo_da_saida: $Enums.tipo_saida;
  unidade_destino_id: number;
  leito_de_destino: $Enums.tipo_leito_de_destino;
  total_de_saida: number;
}
export class BoletimSaidaServiceCreateArgs {
  unidade_id: number;
  referente_ao_dia: string | Date;
  usuario_responsavel_preenchimento_id: string;
  items: BoletimSaidaItem[];
}

export class BoletimSaidaCreateDto {
  @Type(() => Number)
  @IsInt()
  unidade_id: number;
  @IsDateString()
  referente_ao_dia: Date;
  @ApiHideProperty()
  usuario_responsavel_preenchimento_id: string;
  item: BoletimSaidaItem[];
}

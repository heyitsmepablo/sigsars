import { ApiHideProperty, OmitType } from '@nestjs/swagger';
import { $Enums, Prisma } from 'generated/prisma';
import { IsArray, IsDateString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

class BoletimInternacaoAdmissaoItemData {
  boletim_internacao_admissao_id: number;
  numero_de_admissoes: number;
  cid_id: number;
  faixa_etaria: string;
  genero: $Enums.tipo_genero;
}
export class BoletimInternacaoAdmissaoServiceCreateArgs {
  unidade_id: number;
  referente_ao_dia: string | Date;
  usuario_responsavel_preenchimento_id: string;
  items: BoletimInternacaoAdmissaoItemData[];
}

export class BoletimInternacaoAdmissaoCreateDto {
  @Type(() => Number)
  @IsInt()
  unidade_id: number;
  @IsDateString()
  referente_ao_dia: Date;
  @ApiHideProperty()
  usuario_responsavel_preenchimento_id: string;
  @IsArray()
  items: BoletimInternacaoAdmissaoItemData[];
}

import { ApiHideProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsString,
  IsUUID,
} from 'class-validator';
import { $Enums, Prisma } from 'generated/prisma';
enum origem {
  DEMANDA_ESPONTANEA_SAO_LUIS = 'DEMANDA_ESPONTANEA_SAO_LUIS',
  DEMANDA_ESPONTANEA_INTERIOR = 'DEMANDA_ESPONTANEA_INTERIOR',
  REFERENCIADO_UPAS = 'REFERENCIADO_UPAS',
  REFERENCIADO_APS = 'REFERENCIADO_APS',
  REFERENCIADO_CLINICAS = 'REFERENCIADO_CLINICAS',
  OUTROS = 'OUTROS',
}

class BoletimAtendimentoPortaData {}

class BoletimAtendimentoPortaItemData {
  origem: $Enums.tipo_origem_atendimento_porta;
  turno: $Enums.tipo_turno;
  numero_de_atendimentos: number;
  causa_id: number;
  genero: $Enums.tipo_genero;
  faixa_etaria: string;
}

export class BoletimAtendimentoPortaServiceCreateArgs {
  unidade_id: number;
  referente_ao_dia: string | Date;
  usuario_responsavel_preenchimento_id: string;
  items: BoletimAtendimentoPortaItemData[];
}

class BoletimAtendimentoPortaDto {}

class BoletimAtendimentoPortaItemDto
  implements Prisma.boletim_atendimento_porta_itemCreateInput
{
  @IsEnum($Enums.tipo_origem_atendimento_porta)
  origem: $Enums.tipo_origem_atendimento_porta = 'DEMANDA_ESPONTANEA_INTERIOR';
  @IsEnum($Enums.tipo_turno)
  turno: $Enums.tipo_turno = 'SERVICO_DIURNO';
  @Type(() => Number)
  @IsInt()
  numero_de_atendimentos: number;
  @Type(() => Number)
  @IsInt()
  causa_id: number;
  @IsEnum($Enums.tipo_genero)
  genero: $Enums.tipo_genero = 'F';
  @IsString()
  faixa_etaria: string;
}
export class BoletimAtendimentoPortaCreateDto {
  @Type(() => Number)
  @IsInt()
  unidade_id: number;
  @IsDateString()
  referente_ao_dia: Date;
  @ApiHideProperty()
  usuario_responsavel_preenchimento_id: string;
  @IsArray()
  items: BoletimAtendimentoPortaItemDto[];
}

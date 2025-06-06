import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CidWhereQuerysDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  cid_categoria_id?: number;
  @IsOptional()
  @IsString()
  codigo?: string;
}

export class CidPaginationQuerysDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  take?: number;
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  skip?: number;
}
export class CidWhereOptionDto {
  cid_categoria_id?: number;
  codigo?: {
    contains?: string | undefined;
    mode?: 'insensitive' | undefined;
  };
}

export class CidServiceOptionsDto {
  where?: CidWhereOptionDto;
  take?: number;
  skip?: number;
}

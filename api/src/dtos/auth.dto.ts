import { IsEmail, IsInt, IsString } from 'class-validator';

export class AuthServiceSignInArgs {
  usuario: string;
  senha: string;
}

export class AuthServiceSignUpData {
  usuario_tipo_id: number;
  nome: string;
  cargo: string;
  senha: string;
  matricula: string;
  email: string;
  cpf: string;
}

export class AuthSignUpDto {
  @IsInt()
  usuario_tipo_id: number;
  @IsString()
  nome: string;
  @IsString()
  cargo: string;
  @IsString()
  senha: string;
  @IsString()
  matricula: string;
  @IsEmail()
  email: string;
  @IsString()
  cpf: string;
}

export class AuthLoginDto {
  @IsString()
  usuario: string;
  @IsString()
  senha: string;
}

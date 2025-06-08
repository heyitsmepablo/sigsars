import { PickType } from '@nestjs/mapped-types';

export class AuthServiceSignInArgs {
  login: string;
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

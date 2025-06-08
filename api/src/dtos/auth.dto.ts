import { PickType } from '@nestjs/mapped-types';
import { UsuarioServiceCreateData } from './usuario.dto';

export class AuthServiceSignUpCreateData extends PickType(
  UsuarioServiceCreateData,
  [
    'nome',
    'cargo',
    'cpf',
    'senha',
    'email',
    'usuario_tipo_id',
    'matricula',
  ] as const,
) {
  usuario_tipo_id: number;
  nome: string;
  cargo: string;
  matricula: string;
  cpf: string;
  email: string;
  senha: string;
}

export class AuthServiceSignInArgs {
  login: string;
  senha: string;
}

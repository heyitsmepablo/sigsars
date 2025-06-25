export type UsuarioPayload = {
  id: string;
  matricula: string;
  cargo: string;
  nome: string;
  cpf: string;
  email: string;
  usuario_tipo_id: number;
  criado_em: string;
  autalizado_em: string;
} | null;

export type LoginPayload = {
  token: string;
  tipo: string;
  expira_em_milisegundos: number;
  valido_ate_timestamp: number;
  usuario: UsuarioPayload;
  ultimo_login: null | string;
};

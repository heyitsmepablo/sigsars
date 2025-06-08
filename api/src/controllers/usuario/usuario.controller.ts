import { Controller, Get, Param } from '@nestjs/common';
import { UsuarioService } from 'src/services/usuario/usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  /** Busca um usuario pelo id no banco */
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.usuarioService.findOne({ id });
  }
}

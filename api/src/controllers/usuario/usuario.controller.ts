import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UsuarioService } from 'src/services/usuario/usuario.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  /** Busca um usuario pelo id no banco */
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.usuarioService.findOne({ id });
  }
}

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Usuario } from 'src/decorators/usuario/usuario.decorator';
import { FichaSpaCreateDto } from 'src/dtos/ficha-spa.dto';
import { UsuarioDecoratorPayload } from 'src/dtos/usuario.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { FichaSpaService } from 'src/services/ficha-spa/ficha-spa.service';
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('ficha-spa')
export class FichaSpaController {
  constructor(private readonly fichaSpaService: FichaSpaService) {}
  @Post()
  async create(
    @Body() data: FichaSpaCreateDto,
    @Usuario() usuario: UsuarioDecoratorPayload,
  ) {
    data.usuario_responsavel_preenchimento_id = usuario.id;
    data.unidade_id = usuario.unidade.id;
    return await this.fichaSpaService.create(data);
  }
}

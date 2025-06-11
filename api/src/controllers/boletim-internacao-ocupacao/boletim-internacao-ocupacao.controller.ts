import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsuarioUUID } from 'src/decorators/usuario-uuid/usuario-uuid.decorator';
import { BoletimInternacaoOcupacaoCreateDto } from 'src/dtos/boletim-internacao-ocupacao.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { BoletimInternacaoOcupacaoService } from 'src/services/boletim-internacao-ocupacao/boletim-internacao-ocupacao.service';
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('boletim/internacao-ocupacao')
export class BoletimInternacaoOcupacaoController {
  constructor(
    private readonly boletimInternacaoOcupacaoService: BoletimInternacaoOcupacaoService,
  ) {}
  @Post()
  async create(
    @Body() data: BoletimInternacaoOcupacaoCreateDto,
    @UsuarioUUID() usuario_id: string,
  ) {
    data.usuario_responsavel_preenchimento_id = usuario_id;
    return await this.boletimInternacaoOcupacaoService.create(data);
  }
}

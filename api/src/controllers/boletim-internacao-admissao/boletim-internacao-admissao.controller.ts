import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsuarioUUID } from 'src/decorators/usuario-uuid/usuario-uuid.decorator';
import { BoletimInternacaoAdmissaoCreateDto } from 'src/dtos/boletim-internacao-admissao.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { BoletimInternacaoAdmissaoService } from 'src/services/boletim-internacao-admissao/boletim-internacao-admissao.service';
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('boletim/internacao-admissao')
export class BoletimInternacaoAdmissaoController {
  constructor(
    private readonly boletimInternacaoAdmissaoService: BoletimInternacaoAdmissaoService,
  ) {}
  @Post()
  async create(
    @Body() data: BoletimInternacaoAdmissaoCreateDto,
    @UsuarioUUID() usuario_id: string,
  ) {
    data.usuario_responsavel_preenchimento_id = usuario_id;
    return await this.boletimInternacaoAdmissaoService.create(data);
  }
}

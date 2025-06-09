import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsuarioUUID } from 'src/decorators/usuario-uuid/usuario-uuid.decorator';
import { BoletimAtendimentoPortaCreateDto } from 'src/dtos/boletim-atendimento-porta.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { BoletimAtendimentoPortaService } from 'src/services/boletim-atendimento-porta/boletim-atendimento-porta.service';
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('boletim/atendimento-porta')
export class BoletimAtendimentoPortaController {
  constructor(
    private readonly boletimAtendimentoPortaService: BoletimAtendimentoPortaService,
  ) {}

  @Post()
  async create(
    @Body() data: BoletimAtendimentoPortaCreateDto,
    @UsuarioUUID() usuario_id: string,
  ) {
    data.usuario_responsavel_preenchimento_id = usuario_id;
    console.log(data);
    return await this.boletimAtendimentoPortaService.create(data);
  }
}

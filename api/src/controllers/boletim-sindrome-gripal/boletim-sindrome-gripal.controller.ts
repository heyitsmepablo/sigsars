import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { usuario } from 'generated/prisma';
import { Usuario } from 'src/decorators/usuario/usuario.decorator';
import {
  BoletimSindromeGripalCreateDto,
  BoletimSindromeGripalFindAllResponse,
  BoletimSindromeGripalFindOneResponse,
} from 'src/dtos/boletim-sindrome-gripal.dto';
import { UsuarioDecoratorPayload } from 'src/dtos/usuario.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { BoletimSindromeGripalService } from 'src/services/boletim-sindrome-gripal/boletim-sindrome-gripal.service';
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('boletim/sindrome-gripal')
export class BoletimSindromeGripalController {
  constructor(
    private readonly boletimSindromeGripalService: BoletimSindromeGripalService,
  ) {}
  @Get()
  @ApiOkResponse({ type: [BoletimSindromeGripalFindAllResponse] })
  async findAll(@Usuario() usuario: UsuarioDecoratorPayload) {
    return await this.boletimSindromeGripalService.findAll({
      where: { unidade_id: usuario.unidade.id },
    });
  }
  @Post()
  async create(
    @Body() data: BoletimSindromeGripalCreateDto,
    @Usuario() usuario: UsuarioDecoratorPayload,
  ) {
    data.usuario_responsavel_preenchimento_id = usuario.id;
    data.unidade_id = usuario.unidade.id;
    return await this.boletimSindromeGripalService.create(data);
  }
  @Get(':id')
  @ApiOkResponse({ type: BoletimSindromeGripalFindOneResponse })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return await this.boletimSindromeGripalService.findOne({ where: { id } });
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UsuarioUUID } from 'src/decorators/usuario-uuid/usuario-uuid.decorator';
import { BoletimSindromeGripalCreateDto } from 'src/dtos/boletim-sindrome-gripal.dto';
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
  async findAll() {
    return await this.boletimSindromeGripalService.findAll();
  }
  @Post()
  async create(
    @Body() data: BoletimSindromeGripalCreateDto,
    @UsuarioUUID() usuario_id: string,
  ) {
    data.usuario_responsavel_preenchimento_id = usuario_id;
    return await this.boletimSindromeGripalService.create(data);
  }
  @Get(':id')
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return await this.boletimSindromeGripalService.findOne({ where: { id } });
  }
}

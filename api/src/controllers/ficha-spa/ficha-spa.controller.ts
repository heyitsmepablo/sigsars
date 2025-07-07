import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse } from '@nestjs/swagger';
import { Prisma } from 'generated/prisma';
import { Usuario } from 'src/decorators/usuario/usuario.decorator';
import { FichaSpaCreateDto } from 'src/dtos/ficha-spa.dto';
import { UsuarioDecoratorPayload } from 'src/dtos/usuario.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { FichaSpaService } from 'src/services/ficha-spa/ficha-spa.service';
import { FichaSpaFindOneResponse } from 'src/types/ficha-spa.type';
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

  @Get()
  async findAll(@Usuario() usuario: UsuarioDecoratorPayload) {
    return await this.fichaSpaService.findAll({
      where: { unidade_id: usuario.unidade.id },
    });
  }

  @Get(':id')
  async findOne(
    @Usuario() usuario: UsuarioDecoratorPayload,
    @Param('id', new ParseIntPipe()) ficha_id: number,
  ) {
    return await this.fichaSpaService.findOne({
      where: { unidade_id: usuario.unidade.id, id: ficha_id },
    });
  }
}

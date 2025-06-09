import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CidSragService } from 'src/services/cid-srag/cid-srag.service';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('cid/srag')
export class CidSragController {
  constructor(private readonly cidSragService: CidSragService) {}
  /** Lista todos os grupos de cid cadastrados */
  @Get()
  async findAll() {
    return await this.cidSragService.findAll();
  }
}

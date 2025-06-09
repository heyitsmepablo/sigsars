import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CausaSragService } from 'src/services/causa-srag/causa-srag.service';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('causa/srag')
export class CausaSragController {
  constructor(private readonly causaSragService: CausaSragService) {}
  /** Lista todas as causas consideradas srags cadastradas */
  @Get()
  async findAll() {
    return await this.causaSragService.findAll();
  }
}

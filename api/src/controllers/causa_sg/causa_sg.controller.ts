import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CausaSgService } from 'src/services/causa-sg/causa-sg.service';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('causa/sg')
export class CausaSgController {
  constructor(private readonly causaSgService: CausaSgService) {}
  /** Lista todas as causas consideradas srags cadastradas */
  @Get()
  async findAll() {
    return await this.causaSgService.findAll();
  }
}

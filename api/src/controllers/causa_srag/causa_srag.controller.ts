import { Controller, Get } from '@nestjs/common';
import { CausaSragService } from 'src/services/causa-srag/causa-srag.service';

@Controller('causa/srag')
export class CausaSragController {
  constructor(private readonly causaSragService: CausaSragService) {}
  /** Lista todas as causas consideradas srags cadastradas */
  @Get()
  async findAll() {
    return await this.causaSragService.findAll();
  }
}

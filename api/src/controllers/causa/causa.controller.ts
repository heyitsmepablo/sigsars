import { Controller, Get } from '@nestjs/common';
import { CausaService } from 'src/services/causa/causa.service';

@Controller('causa')
export class CausaController {
  constructor(private readonly causaService: CausaService) {}

  /** Lista todas as causas */
  @Get()
  async findAll() {
    return await this.causaService.findAll();
  }
}

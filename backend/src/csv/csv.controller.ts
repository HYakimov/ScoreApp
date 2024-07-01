import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { CsvService } from './csv.service';

@Controller('download')
export class CsvController {

  constructor(private readonly csvService: CsvService) { }

  @Get('csv')
  async downloadCsv(
    @Query('sortBy') sortBy: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Res() res: Response): Promise<void> {
    const csv = await this.csvService.generateCsv(sortBy, page, limit);
    res.header('Content-Type', 'text/csv');
    res.attachment('data.csv');
    res.send(csv);
  }
}
import { Controller, Get, Header, Res, StreamableFile } from '@nestjs/common';
import { CsvService } from './csv.service';

@Controller('download')
export class CsvController {

  constructor(private readonly csvService: CsvService) { }

  @Get('csv')
  @Header('Content-Type', 'text/csv')
  @Header('Content-Disposition', 'attachment; filename="data.csv"')
  async downloadCsv(): Promise<StreamableFile> {
    const csvStream = await this.csvService.generateCsvAsStream();
    return new StreamableFile(csvStream);
  }
}
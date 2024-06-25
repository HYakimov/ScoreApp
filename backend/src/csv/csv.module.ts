import { Module } from '@nestjs/common';
import { CsvService } from './csv.service';
import { CsvController } from './csv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from 'src/scores/score.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Score])],
    providers: [CsvService],
    controllers: [CsvController],
})
export class CsvModule { }
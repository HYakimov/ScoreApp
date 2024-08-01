import { Module } from '@nestjs/common';
import { CsvService } from './csv.service';
import { CsvController } from './csv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [CsvService],
    controllers: [CsvController],
})
export class CsvModule { }
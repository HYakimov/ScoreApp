import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parser } from 'json2csv';
import { Score } from 'src/scores/score.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CsvService {

    constructor(
        @InjectRepository(Score)
        private readonly scoresRepository: Repository<Score>
    ) { }

    async generateCsv(sortBy: string): Promise<string> {
        const data = await this.scoresRepository.find({
            order: sortBy ? { [sortBy]: 'DESC' } : {}
        });
        const json2csv = new Parser();
        
        return json2csv.parse(data);
    }
}
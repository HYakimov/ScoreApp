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

    async generateCsv(sortBy: string, page: number, limit: number): Promise<string> {
        const offset = (page - 1) * limit;
        const data = await this.scoresRepository.find({
            order: sortBy ? { [sortBy]: 'DESC' } : {},
            skip: offset,
            take: limit,
        });
        const json2csv = new Parser();
        console.log(data);
        return json2csv.parse(data);
    }
}
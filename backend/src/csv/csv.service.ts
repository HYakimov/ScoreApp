import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parser } from 'json2csv';
import { User } from 'src/users/user.entity';
import { Readable } from 'stream';
import { Repository } from 'typeorm';

@Injectable()
export class CsvService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async generateCsvAsStream(): Promise<Readable> {
        const data = await this.userRepository.find({ relations: ['scores', 'country'] });
        const json2csv = new Parser();
        const csv = json2csv.parse(data);
        const csvStream = new Readable();
        csvStream.push(csv);
        csvStream.push(null);

        return csvStream;
    }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parser } from 'json2csv';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CsvService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async generateCsv(): Promise<string> {
        const data = await this.userRepository.find({ relations: ['scores', 'country'] });
        const json2csv = new Parser();
        return json2csv.parse(data);
    }
}
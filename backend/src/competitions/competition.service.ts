import { Injectable } from '@nestjs/common';
import { Competition } from './competition.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompetitionDto } from './dtos/create.competition.dto';

@Injectable()
export class CompetitionService {

    constructor(
        @InjectRepository(Competition)
        private readonly competitionRepository: Repository<Competition>
    ) { }

    async getCompetitions(): Promise<Competition[]> {
        return await this.competitionRepository.find();
    }

    async createCompetition(dto: CreateCompetitionDto): Promise<void> {
        const newCompetition = this.competitionRepository.create({ name: dto.name });
        await this.competitionRepository.save(newCompetition);
    }
}
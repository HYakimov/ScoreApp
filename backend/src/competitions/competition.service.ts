import { Injectable } from '@nestjs/common';
import { Competition } from './competition.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCompetitionDto } from './dtos/create.competition.dto';
import { Country } from 'src/countries/country.entity';
import { CustomException } from 'src/exceptions';

@Injectable()
export class CompetitionService {

    constructor(
        @InjectRepository(Competition)
        private readonly competitionRepository: Repository<Competition>,
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>
    ) { }

    async getCompetitions(): Promise<Competition[]> {
        const result = await this.competitionRepository.find({
            relations: ['countries']
        })

        return result;
    }

    async createCompetition(dto: CreateCompetitionDto): Promise<void> {
        const newCompetition = this.competitionRepository.create({ name: dto.name });
        const countries = await this.countryRepository.findBy({ id: In(dto.countryIds) })
        newCompetition.countries = countries;
        await this.competitionRepository.save(newCompetition);
    }

    async deleteById(id: number): Promise<void> {
        const competition = await this.competitionRepository.findOne({ where: { id }, relations: ['countries'] });
        if (!competition) {
            throw CustomException.NotFound(`Entry with ID ${id} not found.`);
        }
        await this.competitionRepository.remove(competition);
    }
}
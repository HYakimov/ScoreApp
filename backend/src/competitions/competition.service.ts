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
        const countries = await this.validateAndReturnCountries(dto.countryIds);
        newCompetition.countries = countries;

        await this.competitionRepository.save(newCompetition);
    }

    async updateById(id: number, dto: CreateCompetitionDto): Promise<void> {
        const competition = await this.validateAndReturnCompetition(id);
        const countries = await this.validateAndReturnCountries(dto.countryIds);
        competition.countries = countries;
        competition.name = dto.name;

        await this.competitionRepository.save(competition);
    }

    async deleteById(id: number): Promise<void> {
        const competition = await this.validateAndReturnCompetition(id);
        await this.competitionRepository.remove(competition);
    }

    private async validateAndReturnCompetition(id: number): Promise<Competition> {
        const competition = await this.competitionRepository.findOne({ where: { id }, relations: ['countries'] });
        if (!competition) {
            throw CustomException.NotFound(`Competition with id ${id} not found.`);
        }

        return competition;
    }

    private async validateAndReturnCountries(ids: number[]): Promise<Country[]> {
        const countries = await this.countryRepository.findBy({ id: In(ids) });
        if (!countries) {
            throw CustomException.NotFound(`Countries with ids ${ids} not found.`);
        }

        return countries;
    }
}
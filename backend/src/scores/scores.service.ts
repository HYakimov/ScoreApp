import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './score.entity';
import { CustomException } from 'src/exceptions';
import { EventsGateway } from 'src/events.gateway';
import { Country } from 'src/countries/country.entity';

@Injectable()
export class ScoresService {

    constructor(
        @InjectRepository(Score)
        private readonly scoresRepository: Repository<Score>,
        @InjectRepository(Country)
        private countryRepository: Repository<Country>,
        private readonly eventsGateway: EventsGateway
    ) { }

    async findWithPagination(sortBy: string, page: number, limit: number): Promise<{ data: any, totalCount: number }> {
        this.validatePage(page);
        const offset = (page - 1) * limit;
        const [scores, totalCount] = await this.scoresRepository.findAndCount({
            order: sortBy ? { [sortBy]: 'DESC' } : {},
            skip: offset,
            take: limit,
            relations: ['country']
        });
        const data = scores.map(score => ({ ...score, country: score.country.name }));

        return { data, totalCount };
    }

    private validatePage(page: number) {
        if (page < 1) {
            throw CustomException.BadRequest("Page number must be greater than 0.");
        }
    }

    async create(scoreDto: any): Promise<void> {
        const country = await this.countryRepository.findOne({ where: { name: scoreDto.country } });
        const score = this.scoresRepository.create({
            firstName: scoreDto.firstName,
            lastName: scoreDto.lastName,
            score: scoreDto.score,
            age: scoreDto.age,
            country: country,
            city: scoreDto.city,
            gender: scoreDto.gender
        });
        score.getValidation();
        const savedScore = await this.scoresRepository.save(score);
        this.eventsGateway.onNewEntryOrEdit(savedScore.id);
    }

    async updateById(scoreDto: any, id: number): Promise<void> {
        const country = await this.countryRepository.findOne({ where: { name: scoreDto.country } });
        const updateData = this.scoresRepository.create({
            firstName: scoreDto.firstName,
            lastName: scoreDto.lastName,
            score: scoreDto.score,
            age: scoreDto.age,
            country: country,
            city: scoreDto.city,
            gender: scoreDto.gender
        });
        updateData.getValidation();
        const scoreToUpdate = await this.scoresRepository.findOne({ where: { id } });
        if (!scoreToUpdate) {
            throw CustomException.NotFound(`Score with ID ${id} not found.`);
        }
        await this.scoresRepository.update(id, updateData);
        this.eventsGateway.onNewEntryOrEdit(id);
    }

    async deleteAll(): Promise<void> {
        await this.scoresRepository.clear();
        this.eventsGateway.sendUpdate();
    }

    async deleteById(id: number): Promise<void> {
        const result = await this.scoresRepository.delete(id);
        if (result.affected < 1) {
            throw CustomException.NotFound(`Entry with ID ${id} not found.`)
        }
        this.eventsGateway.sendUpdate();
    }
}
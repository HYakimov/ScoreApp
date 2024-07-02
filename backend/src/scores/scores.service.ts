import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './score.entity';
import { CustomException } from 'src/exceptions';
import { EventsGateway } from 'src/events.gateway';
import { ScoreDto } from './dtos/score.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class ScoresService {

    constructor(
        @InjectRepository(Score)
        private readonly scoresRepository: Repository<Score>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly eventsGateway: EventsGateway
    ) { }

    async create(dto: ScoreDto): Promise<void> {
        const user = await this.userRepository.findOne({ where: { id: dto.userId } });
        if (!user) {
            throw CustomException.NotFound(`User with ID ${dto.userId} not found.`);
        }
        const score = this.scoresRepository.create({
            value: dto.value,
            user: user
        });
        score.getScoreValidation();
        const savedScore = await this.scoresRepository.save(score);
        this.eventsGateway.onNewEntryOrEdit(savedScore.id);
    }

    async updateById(dto: ScoreDto, id: number): Promise<void> {
        if (dto.id != id) {
            throw CustomException.BadRequest("Id's do not match.");
        }
        const user = await this.userRepository.findOne({ where: { id: dto.userId } });
        if (!user) {
            throw CustomException.NotFound(`User with ID ${dto.userId} not found.`);
        }
        const updateData: Partial<Score> = {
            value: dto.value
        };
        updateData.getScoreValidation();
        const scoreToUpdate = await this.scoresRepository.findOne({ where: { id } });
        if (!scoreToUpdate) {
            throw CustomException.NotFound(`Score with ID ${id} not found.`);
        }
        await this.scoresRepository.update(id, updateData);
        this.eventsGateway.onNewEntryOrEdit(id);
    }
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './score.entity';
import { CustomException } from 'src/exceptions';
import { EventsGateway } from 'src/events.gateway';
import { User } from 'src/user/user.entity';
import { ScoreDto } from './dtos/score.dto';

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
        const user = await this.validateAndReturnUser(dto.userId);
        const score = this.scoresRepository.create({
            value: dto.value,
            user: user
        });
        score.getScoreValidation();
        const savedScore = await this.scoresRepository.save(score);
        this.eventsGateway.onNewEntryOrEdit(savedScore.id);
    }

    async updateById(dto: ScoreDto, id: number): Promise<void> {
        this.validateIds(dto.id, id);
        await this.validateAndReturnUser(dto.userId);
        const score = await this.validateAndReturnScore(dto.id);
        score.value = dto.value;
        score.getScoreValidation();
        await this.scoresRepository.save(score);
        this.eventsGateway.onNewEntryOrEdit(id);
    }

    private validateIds(dtoId: number, pathId: number) {
        if (dtoId != pathId) {
            throw CustomException.BadRequest("Id's do not match.");
        }
    }

    private async validateAndReturnUser(userId: number): Promise<User> {
        const user = this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw CustomException.NotFound(`User with Id ${userId} not found.`);
        }

        return user;
    }

    private async validateAndReturnScore(scoreId: number): Promise<Score> {
        const score = this.scoresRepository.findOne({ where: { id: scoreId } });
        if (!score) {
            throw CustomException.NotFound(`Score with Id ${scoreId} not found.`);
        }

        return score;
    }
}
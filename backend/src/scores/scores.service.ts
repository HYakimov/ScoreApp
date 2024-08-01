import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './score.entity';
import { CustomException } from 'src/exceptions';
import { User } from 'src/users/user.entity';
import { ScoreDto } from './dtos/score.dto';
import { Competition } from 'src/competitions/competition.entity';
import { EventsGateway } from 'src/events.gateway';
import { ScoresDtoForChart } from './dtos/scores.dto.for.chart';

@Injectable()
export class ScoresService {

    constructor(
        @InjectRepository(Score)
        private readonly scoresRepository: Repository<Score>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Competition)
        private competitionRepository: Repository<Competition>,
        private readonly eventsGateway: EventsGateway
    ) { }

    async createOrUpdate(dto: ScoreDto): Promise<void> {
        const user = await this.validateAndReturnUser(dto.userId);
        const competition = await this.validateAndReturnCompetition(dto.competitionId);
        let score = await this.scoresRepository.findOne({
            where: { user: { id: dto.userId }, competition: { id: dto.competitionId } },
            relations: ['user', 'competition']
        });

        if (score) {
            score.value = dto.value;
        } else {
            score = this.scoresRepository.create({
                value: dto.value,
                user: user,
                competition: competition
            });
        }

        await this.scoresRepository.save(score);
        this.eventsGateway.onNewEntryOrEdit(score.id);
    }

    async getDataForChart(): Promise<ScoresDtoForChart> {
        const data = await this.competitionRepository.query(
            `SELECT 
                s.competitionId, 
                cc.name as competitionName, 
                u.countryId, 
                c.name as countryName, 
                AVG(s.value) AS averageScore
            FROM score AS s
            JOIN user AS u ON s.userId = u.id
            JOIN competition AS cc ON s.competitionId = cc.id
            JOIN country AS c ON u.countryId = c.id
            GROUP BY s.competitionId, u.countryId`
        );

        return ScoresDtoForChart.create(data);
    }

    private async validateAndReturnUser(userId: number): Promise<User> {
        const user = this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw CustomException.NotFound(`User with Id ${userId} not found.`);
        }

        return user;
    }

    private async validateAndReturnCompetition(competitionId: number): Promise<Competition> {
        const competition = this.competitionRepository.findOne({ where: { id: competitionId } });
        if (!competition) {
            throw CustomException.NotFound(`Competition with Id ${competitionId} not found.`);
        }

        return competition;
    }
}
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

    async getDataForChart(primaryKey: string): Promise<ScoresDtoForChart> {
        let primaryValue: string;
        let secondaryKey: string;
        let secondaryValue: string;

        switch (primaryKey) {
            case 'countryId':
                primaryValue = 'countryName';
                secondaryKey = 'competitionId';
                secondaryValue = 'competitionName';
                break;
            case 'competitionId':
                primaryValue = 'competitionName';
                secondaryKey = 'countryId';
                secondaryValue = 'countryName';
                break;
            default:
                throw new Error('Invalid primary key');
        }

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

        return ScoresDtoForChart.create(data, primaryKey, primaryValue, secondaryKey, secondaryValue);
    }

    async getOldestUsersPerCompetition(): Promise<any> {
        const data = await this.competitionRepository.query(
            `WITH user_score (competitionId, competitionName, userId, fullName, age, maxScore, rn) AS (
                SELECT 
                    s.competitionId, 
                    c.name, 
                    u.id, 
                    CONCAT(u.firstName, " ", u.lastName) AS fullName, 
                    u.age, 
                    MAX(s.value), 
                    ROW_NUMBER() OVER(PARTITION BY s.competitionId ORDER BY MAX(s.value) DESC, u.age DESC) AS rn
                FROM score s 
                JOIN user u ON s.userId = u.id
                JOIN competition c ON c.id = s.competitionId
                GROUP BY s.competitionId, u.id, u.firstName, u.lastName, u.age, c.name
            )
            SELECT 
                su.competitionId, 
                su.competitionName, 
                su.userId,
                su.fullName, 
                su.age, 
                su.maxScore
            FROM competition c
            JOIN user_score su ON su.competitionId = c.id AND su.rn = 1;`
        );

        console.log(data);
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
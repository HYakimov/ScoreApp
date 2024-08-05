import { Controller, Post, Body, Res, HttpStatus, Get, Param } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoreDto } from './dtos/score.dto';
import { ChartType } from 'src/enums/ChartType';

@Controller('scores')
export class ScoresController {

    constructor(private readonly scoresService: ScoresService) { }

    @Get('forChart/:chartType')
    async findAll(@Res() res, @Param('chartType') chartType): Promise<void> {
        const result = await this.scoresService.getDataForChart(chartType);
        res.status(HttpStatus.OK).json(result);
    }

    @Get('oldestUsersPerCompetition')
    async findOldestUsersPerCompetition(@Res() res): Promise<void> {
        const result = await this.scoresService.getOldestUsersPerCompetition();
        res.status(HttpStatus.OK).json(result);
    }

    @Post()
    async createOrUpdate(@Body() dto: ScoreDto, @Res() res): Promise<void> {
        await this.scoresService.createOrUpdate(dto);
        res.status(HttpStatus.CREATED).json('Data saved successfully');
    }
}
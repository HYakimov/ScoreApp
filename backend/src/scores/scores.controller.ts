import { Controller, Post, Body, Res, HttpStatus, Get, Param } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoreDto } from './dtos/score.dto';

@Controller('scores')
export class ScoresController {

    constructor(private readonly scoresService: ScoresService) { }

    @Get(':primaryKey')
    async findAll(@Res() res, @Param('primaryKey') primaryKey): Promise<void> {
        const result = await this.scoresService.getDataForChart(primaryKey);
        res.status(HttpStatus.OK).json(result);
    }

    @Post()
    async createOrUpdate(@Body() dto: ScoreDto, @Res() res): Promise<void> {
        await this.scoresService.createOrUpdate(dto);
        res.status(HttpStatus.CREATED).json('Data saved successfully');
    }
}
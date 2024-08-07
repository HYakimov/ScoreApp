import { Controller, Post, Body, Res, HttpStatus, Param, Put, ValidationPipe, UsePipes, Get } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoreDto } from './dtos/score.dto';

@Controller('scores')
export class ScoresController {

    constructor(private readonly scoresService: ScoresService) { }

    @Post()
    async createOrUpdate(@Body() dto: ScoreDto, @Res() res): Promise<void> {
        await this.scoresService.createOrUpdate(dto);
        res.status(HttpStatus.CREATED).send('Data saved successfully');
    }
}
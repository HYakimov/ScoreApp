import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoreDto } from './dtos/score.dto';

@Controller('scores')
export class ScoresController {

    constructor(private readonly scoresService: ScoresService) { }

    @Post()
    async createOrUpdate(@Body() dto: ScoreDto, @Res() res): Promise<void> {
        await this.scoresService.createOrUpdate(dto);
        res.status(HttpStatus.CREATED).json('Data saved successfully');
    }
}
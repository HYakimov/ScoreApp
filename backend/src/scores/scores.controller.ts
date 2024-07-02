import { Controller, Post, Body, Res, HttpStatus, Param, Put } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoreDto } from './dtos/score.dto';

@Controller('data')
export class ScoresController {

    constructor(private readonly scoresService: ScoresService) { }

    @Post()
    async create(@Body() dto: ScoreDto, @Res() res): Promise<void> {
        await this.scoresService.create(dto);
        res.status(HttpStatus.CREATED).send('Data saved successfully');
    }

    @Put(':id')
    async updateById(@Param('id') id: number, @Body() dto: ScoreDto, @Res() res): Promise<void> {
        await this.scoresService.updateById(dto, id);
        res.status(HttpStatus.OK).send('Data updated successfully');
    }
}
import { Controller, Post, Body, Res, HttpStatus, Param, Put, ValidationPipe, UsePipes, Get } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoreDto } from './dtos/score.dto';
import { plainToInstance } from 'class-transformer';

@Controller('scores')
export class ScoresController {

    constructor(private readonly scoresService: ScoresService) { }

    @Post()
    // @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
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
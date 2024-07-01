import { Controller, Delete, Post, Get, Body, Res, HttpStatus, Param, Query, Put } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { Score } from './score.entity';

@Controller('data')
export class ScoresController {

    constructor(private readonly scoresService: ScoresService) { }

    @Get()
    async findAll(
        @Query('sortBy') sortBy: string,
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Res() res,
    ): Promise<void> {
        const result = await this.scoresService.findWithPagination(sortBy, page, limit);
        res.status(HttpStatus.OK).json(result);
    }

    @Post()
    async create(@Body() score: any, @Res() res): Promise<void> {
        await this.scoresService.create(score);
        res.status(HttpStatus.CREATED).send('Data saved successfully');
    }

    @Put(':id')
    async updateById(@Param('id') id: number, @Body() scoreDto: any, @Res() res): Promise<void> {
        await this.scoresService.updateById(scoreDto, id);
        res.status(HttpStatus.OK).send('Data updated successfully');
    }

    @Delete()
    async deleteAll(@Res() res): Promise<void> {
        await this.scoresService.deleteAll();
        res.status(HttpStatus.OK).send('All entries deleted successfully');
    }

    @Delete(':id')
    async deleteById(@Param('id') id: number, @Res() res): Promise<void> {
        await this.scoresService.deleteById(id);
        res.status(HttpStatus.OK).send(`Entry with ID ${id} deleted successfully`);
    }
}
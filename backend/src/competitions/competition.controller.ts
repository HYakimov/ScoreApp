import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CompetitionService } from './competition.service';
import { CreateCompetitionDto } from './dtos/create.competition.dto';

@Controller('competitions')
export class CompetitionController {

    constructor(private readonly competitionService: CompetitionService) { }

    @Get()
    async getCompetitions(@Res() res): Promise<void> {
        const result = await this.competitionService.getCompetitions();
        res.status(HttpStatus.OK).json(result);
    }

    @Post()
    async create(@Body() dto: CreateCompetitionDto, @Res() res): Promise<void> {
        await this.competitionService.createCompetition(dto);
        res.status(HttpStatus.CREATED).json("Data saved successfully");
    }

    //put
    @Put(':id')
    async updateById(@Param('id') id: number, @Body() dto: CreateCompetitionDto, @Res() res): Promise<void> {
        await this.competitionService.updateById(id, dto);
        res.status(HttpStatus.OK).json("Data updated successfully");
    }

    @Delete(':id')
    async deleteById(@Param('id') id: number, @Res() res): Promise<void> {
        console.log("id", id);
        await this.competitionService.deleteById(id);
        res.status(HttpStatus.OK).json(`Entry with ID ${id} deleted successfully`);
    }
}
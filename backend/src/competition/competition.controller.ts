import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
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
        res.status(HttpStatus.CREATED).send('Data saved successfully');
    }
}
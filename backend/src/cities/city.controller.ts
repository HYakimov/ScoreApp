import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('cities')
export class CityController {

    constructor(private readonly cityService: CityService) { }

    @Get(':id')
    async getCitiesByCountryId(@Param('id') id: number, @Res() res): Promise<void> {
        const result = await this.cityService.getCitiesByCountryId(id);
        res.status(HttpStatus.OK).json(result);
    }

    @Post()
    async create(@Body() city: any, @Res() res): Promise<void> {
        await this.cityService.addCity(city);
        res.status(HttpStatus.CREATED).send('Data saved successfully');
    }
}
import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { CountryService } from './country.service';
import { Country } from './country.entity';

@Controller()
export class CountryController {

    constructor(private readonly countryService: CountryService) { }

    @Get('countries')
    async getCountires(@Res() res): Promise<void> {
        const result = await this.countryService.getCountries();
        res.status(HttpStatus.OK).json(result);
    }

    @Get('cities/:id')
    getCities(@Param('id') id: number, @Res() res): void {
        const result = this.countryService.getCities(id);
        res.status(HttpStatus.OK).json(result);
    }

    @Post()
    async create(@Body() country: Country, @Res() res) {
        await this.countryService.addCountry(country.name);
        res.status(HttpStatus.CREATED).send('Data saved successfully');
    }
}
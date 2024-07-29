import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CountryService } from './country.service';
import { Country } from './country.entity';

@Controller('countries')
export class CountryController {

    constructor(private readonly countryService: CountryService) { }

    @Get()
    async getCountires(@Res() res): Promise<void> {
        const result = await this.countryService.getCountries();
        res.status(HttpStatus.OK).json(result);
    }

    @Post()
    async create(@Body() country: Country, @Res() res): Promise<void> {
        await this.countryService.addCountry(country.name);
        res.status(HttpStatus.CREATED).json('Data saved successfully');
    }
}
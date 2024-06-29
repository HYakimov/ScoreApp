import { Controller, Get, Param } from '@nestjs/common';
import { CityService } from './city.service';

@Controller('cities')
export class CityController {

    constructor(private readonly cityService: CityService) { }

    @Get(':countryId')
    findByCountry(@Param('countryId') countryId: number) {
        return this.cityService.findByCountry(countryId);
    }
}

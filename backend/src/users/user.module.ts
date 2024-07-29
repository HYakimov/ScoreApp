import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Country } from 'src/countries/country.entity';
import { EventsGateway } from 'src/events.gateway';
import { City } from 'src/cities/city.entity';
import { Competition } from 'src/competitions/competition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Country, City, Competition])],
  providers: [UserService, EventsGateway],
  controllers: [UserController]
})
export class UserModule { }
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Country } from 'src/countries/country.entity';
import { EventsGateway } from 'src/events.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Country])],
  providers: [UserService, EventsGateway],
  controllers: [UserController]
})
export class UserModule { }
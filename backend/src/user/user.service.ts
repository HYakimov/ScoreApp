import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomException } from 'src/exceptions';
import { EventsGateway } from 'src/events.gateway';
import { Country } from 'src/countries/country.entity';
import { User } from './user.entity';
import { UserUpdateDto } from './dtos/user.update.dto';
import { UserRegistrationDto } from './dtos/user.registration.dto';
import { UserPaginationDto } from './dtos/user.pagination.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Country)
        private countryRepository: Repository<Country>,
        private readonly eventsGateway: EventsGateway
    ) { }

    async findWithPagination(sortBy: string, page: number, limit: number): Promise<UserPaginationDto> {
        this.validatePage(page);
        const offset = (page - 1) * limit;
        const [users, totalCount] = await this.userRepository.findAndCount({
            order: sortBy ? { [sortBy]: 'DESC' } : {},
            skip: offset,
            take: limit,
            relations: ['country', 'scores']
        });

        return UserPaginationDto.create(users, totalCount);
    }

    private validatePage(page: number): void {
        if (page < 1) {
            throw CustomException.BadRequest("Page number must be greater than 0.");
        }
    }

    async create(dto: UserRegistrationDto): Promise<void> {
        const country = await this.countryRepository.findOne({ where: { id: dto.countryId } });
        const user = this.userRepository.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            age: dto.age,
            country: country,
            city: dto.cityId,
            gender: dto.gender,
            email: dto.email
        });
        // user.getValidation();
        const savedUser = await this.userRepository.save(user);
        this.eventsGateway.onNewEntryOrEdit(savedUser.id);
    }

    async updateById(dto: UserUpdateDto, id: number): Promise<void> {
        if (dto.id != id) {
            throw CustomException.BadRequest("Id's do not match.");
        }
        const country = await this.countryRepository.findOne({ where: { id: dto.countryId } });
        const updateData: Partial<User> = {
            firstName: dto.firstName,
            lastName: dto.lastName,
            age: dto.age,
            country: country,
            city: dto.cityId,
            gender: dto.gender,
            email: dto.email
        };
        // updateData.getValidation();
        const userToUpdate = await this.userRepository.findOne({ where: { id } });
        if (!userToUpdate) {
            throw CustomException.NotFound(`User with ID ${id} not found.`);
        }
        await this.userRepository.update(id, updateData);
        this.eventsGateway.onNewEntryOrEdit(id);
    }

    async deleteAll(): Promise<void> {
        await this.userRepository.clear();
        this.eventsGateway.sendUpdate();
    }

    async deleteById(id: number): Promise<void> {
        const result = await this.userRepository.delete(id);
        if (result.affected < 1) {
            throw CustomException.NotFound(`Entry with ID ${id} not found.`)
        }
        this.eventsGateway.sendUpdate();
    }
}
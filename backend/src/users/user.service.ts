import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CustomException } from 'src/exceptions';
import { EventsGateway } from 'src/events.gateway';
import { Country } from 'src/countries/country.entity';
import { User } from './user.entity';
import { UserInputDto } from './dtos/user.input.dto';
import { UserResponseDto } from './dtos/user.response.dto';
import { City } from 'src/cities/city.entity';
import { Competition } from 'src/competitions/competition.entity';
import { UserBasicDtoResponse } from './dtos/user.basic.dto.response';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Country)
        private countryRepository: Repository<Country>,
        @InjectRepository(Competition)
        private competitionRepository: Repository<Competition>,
        @InjectRepository(City)
        private cityRepository: Repository<City>,
        private readonly eventsGateway: EventsGateway,
        @InjectEntityManager()
        private readonly entityManager: EntityManager
    ) { }

    async findWithPagination(sortBy: string, page: number, pageSize: number): Promise<UserResponseDto> {
        this.validatePaginationDetails(page, pageSize);
        const limit = pageSize;
        const offset = (page - 1) * pageSize;
        let query = `
        SELECT
            u.id,
            u.firstName,
            u.lastName,
            u.age,
            u.gender,
            u.email,
            u.avatarPath,
            c.id AS cityId,
            c.name AS cityName,
            cn.id AS countryId,
            cn.name AS countryName,
            s.id AS scoreId,
            s.value AS scoreValue,
            comp.id AS competitionId,
            COUNT(*) OVER() AS total 
        FROM
            User u
        LEFT JOIN
            City c ON u.cityId = c.id
        LEFT JOIN
            Country cn ON u.countryId = cn.id
        LEFT JOIN
            Score s ON u.id = s.userId
        LEFT JOIN
            Competition comp ON s.competitionId = comp.id
        `;

        if (sortBy === 'score') {
            query += ` ORDER BY s.value DESC `;
        } else if (sortBy === 'age') {
            query += ` ORDER BY u.age DESC `;
        }

        query += ` LIMIT ${limit} OFFSET ${offset} `;

        const users = await this.entityManager.query(query);

        return UserResponseDto.create(users);
    } // TODO refactor

    async findAllForCompetition(id: number): Promise<any> {
        const users = await this.competitionRepository.query(
            `SELECT 
                u.id, 
                u.firstName,
                u.lastName 
            FROM user AS u
            JOIN competition_countries_country AS ccc ON ccc.countryId = u.countryId
            WHERE ccc.competitionId = ?`, [id]
        );

        return UserBasicDtoResponse.create(users);
    }

    private validatePaginationDetails(page: number, pageSize: number): void {
        if (page < 1) {
            throw CustomException.BadRequest("Page number must be greater than 0.");
        }
        if (pageSize < 1) {
            throw CustomException.BadRequest("Page size must be greater than 0.");
        }
    }

    async create(dto: UserInputDto, filePath: string): Promise<void> {
        const country = await this.countryRepository.findOne({ where: { id: dto.countryId } });
        const city = await this.cityRepository.findOne({ where: { id: dto.cityId } });
        const user = this.userRepository.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            age: dto.age,
            country: country,
            city: city,
            gender: dto.gender,
            email: dto.email,
            avatarPath: filePath ?? 'uploads\\avatars\\avatardefault'
        });
        const savedUser = await this.userRepository.save(user);
        this.eventsGateway.onNewEntryOrEdit(savedUser.id);
    }

    async updateById(dto: UserInputDto, id: number, filePath: string): Promise<void> {
        const country = await this.countryRepository.findOne({ where: { id: dto.countryId } });
        const city = await this.cityRepository.findOne({ where: { id: dto.cityId } });
        const updateData: Partial<User> = {
            firstName: dto.firstName,
            lastName: dto.lastName,
            age: dto.age,
            country: country,
            city: city,
            gender: dto.gender,
            email: dto.email,
            avatarPath: filePath ?? 'uploads\\avatars\\avatardefault'
        };
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
        const user = await this.userRepository.findOne({ where: { id }, relations: ['scores'] });
        if (!user) {
            throw CustomException.NotFound(`Entry with ID ${id} not found.`);
        }
        await this.userRepository.remove(user);
        this.eventsGateway.sendUpdate();
    }
}
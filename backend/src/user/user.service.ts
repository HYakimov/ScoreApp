import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { CustomException } from 'src/exceptions';
import { EventsGateway } from 'src/events.gateway';
import { Country } from 'src/countries/country.entity';
import { User } from './user.entity';
import { UserInputDto } from './dtos/user.input.dto';
import { UserDto } from './dtos/user.dto';
import { UserResponseDto } from './dtos/user.response.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Country)
        private countryRepository: Repository<Country>,
        private readonly eventsGateway: EventsGateway,
        @InjectEntityManager()
        private readonly entityManager: EntityManager
    ) { }

    async findWithPagination(sortBy: string, page: number, pageSize: number): Promise<UserResponseDto> {
        this.validatePage(page);
        let query = `
        SELECT 
            u.id, u.firstName, u.lastName, u.age, u.gender, u.email, u.avatarPath, u.city as cityId, 
            c.id as countryId, c.name as countryName, s.value as scoreValue, s.id as scoreId,
            COUNT(*) OVER() as total_count
        FROM 
            User u
        JOIN 
            Country c ON u.countryId = c.id
        JOIN 
            Score s ON u.id = s.userId
        JOIN (
            SELECT 
                MIN(s.id) AS first_score_id
            FROM 
                Score s
            GROUP BY 
                s.userId
        ) fs ON s.id = fs.first_score_id
    `;

        if (sortBy === 'score') {
            query += ` ORDER BY s.value DESC `;
        } else if (sortBy === 'age') {
            query += ` ORDER BY u.age DESC `;
        }

        query += ` LIMIT ? OFFSET ? `;

        const params = [pageSize, (page - 1) * pageSize];
        const users = await this.entityManager.query(query, params);
        const totalCount = users.length > 0 ? users[0].total_count : 0;

        return (UserResponseDto.create(users, totalCount));
    }

    async findAll(): Promise<UserDto[]> {
        const users = await this.userRepository.find({ relations: ['country', 'scores'] });
        return users.map(u => UserDto.create(u));
    }

    private validatePage(page: number): void {
        if (page < 1) {
            throw CustomException.BadRequest("Page number must be greater than 0.");
        }
    }

    async create(dto: UserInputDto, filePath: string): Promise<void> {
        const country = await this.countryRepository.findOne({ where: { id: dto.countryId } });
        const user = this.userRepository.create({
            firstName: dto.firstName,
            lastName: dto.lastName,
            age: dto.age,
            country: country,
            city: dto.cityId,
            gender: dto.gender,
            email: dto.email,
            avatarPath: filePath ?? 'uploads\\avatars\\avatardefault'
        });
        const savedUser = await this.userRepository.save(user);
        this.eventsGateway.onNewEntryOrEdit(savedUser.id);
    }

    async updateById(dto: UserInputDto, id: number, filePath: string): Promise<void> {
        const country = await this.countryRepository.findOne({ where: { id: dto.countryId } });
        const updateData: Partial<User> = {
            firstName: dto.firstName,
            lastName: dto.lastName,
            age: dto.age,
            country: country,
            city: dto.cityId,
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
import { Controller, Get, Post, Put, Delete, HttpStatus, Query, Res, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRegistrationDto } from './dtos/user.registration.dto';
import { UserUpdateDto } from './dtos/user.update.dto';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get('/paginated')
    async findAllWithPagination(
        @Query('sortBy') sortBy: string,
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Res() res,
    ): Promise<void> {
        const result = await this.userService.findWithPagination(sortBy, page, limit);
        res.status(HttpStatus.OK).json(result);
    }

    @Get()
    async findAll(@Res() res): Promise<void> {
        const result = await this.userService.findAll();
        res.status(HttpStatus.OK).json(result);
    }

    @Post()
    async create(@Body() userDto: UserRegistrationDto, @Res() res): Promise<void> {
        await this.userService.create(userDto);
        res.status(HttpStatus.CREATED).send('Data saved successfully');
    }

    @Put(':id')
    async updateById(@Param('id') id: number, @Body() userDto: UserUpdateDto, @Res() res): Promise<void> {
        await this.userService.updateById(userDto, id);
        res.status(HttpStatus.OK).send('Data updated successfully');
    }

    @Delete()
    async deleteAll(@Res() res): Promise<void> {
        await this.userService.deleteAll();
        res.status(HttpStatus.OK).send('All entries deleted successfully');
    }

    @Delete(':id')
    async deleteById(@Param('id') id: number, @Res() res): Promise<void> {
        await this.userService.deleteById(id);
        res.status(HttpStatus.OK).send(`Entry with ID ${id} deleted successfully`);
    }
}
import { Controller, Get, Post, Put, Delete, HttpStatus, Query, Res, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInputDto } from './dtos/user.input.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: './uploads/avatars',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = extname(file.originalname);
                const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
                cb(null, filename);
            },
        }),
    }))
    async create(
        @Body() dto: UserInputDto,
        @UploadedFile() file: Express.Multer.File,
        @Res() res,
    ): Promise<void> {
        let filePath: string | null;
        if (file) {
            filePath = file.path;
        } else {
            filePath = null;
        }
        await this.userService.create(dto, filePath);
        res.status(HttpStatus.CREATED).send('Data saved successfully');
    }

    @Put(':id')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: './uploads/avatars',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = extname(file.originalname);
                const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
                cb(null, filename);
            },
        }),
    }))
    async updateById(
        @Param('id') id: number,
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: UserInputDto,
        @Res() res): Promise<void> {
        let filePath: string | null;
        if (file) {
            filePath = file.path;
        } else {
            filePath = null;
        }
        await this.userService.updateById(dto, id, filePath);
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
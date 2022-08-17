import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import updateUserDto from './DTO/update-user.dto';
import createUserDto from './DTO/create-user.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @Post()
    createUser(@Body() dto: createUserDto) {
        return this.usersService.create(dto);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() dto: updateUserDto) {
        return this.usersService.update({...dto, id});
    }

    @Get('/:id')
    getUserByID(@Param('id') id: string) {
        return this.usersService.getById(id);
    }

    @Get()
    getAllUsers() {
        return this.usersService.getAll();
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.usersService.delete(id);
    }
}

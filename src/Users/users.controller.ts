import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import updateUserDto from './DTO/update-user.dto';
import filterDto from 'src/utilites/Pagination/DTO/filter.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @Get()
    usersFind(@Query() dto: filterDto) {
        return this.usersService.getAll(dto);
    }

    @Get('/:id')
    usersRead(@Param('id') id: string) {
        return this.usersService.getById(id);
    }

    @Patch('/:id')
    usersUpdate(@Param('id') id: string, @Body() dto: updateUserDto) {
        return this.usersService.update({ ...dto, id });
    }

    @Delete('/:id')
    usersRemove(@Param('id') id: string) {
        return this.usersService.delete(id);
    }

    @Get('/:id/communications')
    usersCommunicationsFind(@Param('id') id: string) {
        
    }

    @Post('/:id/communications')
    usersCommunicationsCreate(@Param('id') id: string) {

    }
}

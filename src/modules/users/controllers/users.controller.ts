import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { UsersService } from '../application/services/users.service';
import UpdateUserDto from '../application/DTO/updateUser.dto';
import FilterUserDto from '../infrastructure/DTO/filterUser.dto';
import FilterCommDto from '../infrastructure/DTO/filterComm.dto';
import CreateCommDto from 'src/modules/users/application/DTO/createCommDto';
import ConfirmUserCommDto from '../application/DTO/confirmUserComm.dto';
import ChangeRoleDto from '../application/DTO/changeRole.dto';
import CreateUserDto from '../application/DTO/createUser.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    //TODO: DELETE this test method!
    @Post()
    createUser(@Body() dto: CreateUserDto) {
        return this.usersService.create(dto);
    }

    @Get()
    usersFind(@Query() dto: FilterUserDto) {
        return this.usersService.getFiltered(dto);
    }

    @Get('/:id')
    usersRead(@Param('id') id: string) {
        return this.usersService.getById(id);
    }

    @Patch('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    usersUpdate(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.usersService.update(id, dto);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    usersRemove(@Param('id') id: string) {
        return this.usersService.delete(id);
    }

    @Get('/:id/communications')
    usersCommunicationsFind(@Param('id') id: string, @Query() dto: FilterCommDto) {
        return this.usersService.getAllUserComms({ userId: id, ...dto });
    }

    @Post('/:id/communications')
    usersCommunicationCreate(@Param('id') id: string, @Body() dto: CreateCommDto) {
        return this.usersService.createComm(id, dto);
    }

    //TODO: All following methods are not deeply implemented yet!
    @Delete('/:id/communications/:commID')
    @HttpCode(HttpStatus.NO_CONTENT)
    userCommunicationDelete(@Param('id') id: string, @Param('commID') commID: string) {
        return this.usersService.deleteComm(id, commID);
    }

    @Post('/:id/communications/:commID/confirm')
    usersCommunicationConfirm(@Param('id') id: string, @Body() dto: ConfirmUserCommDto) {
        return this.usersService.confirmComm(id, dto);
    }

    @Post('/:id/communications/:commID/confirm/send-code')
    usersCommunicationConfirmSendCode(@Param('id') id: string) {
        return this.usersService.sendCode(id);
    }

    @Post('/:id/change-role/:userRole')
    usersChangeRole(@Param('id') id: string, @Param('userRole') dto: ChangeRoleDto) {
        //TODO: need to check can we get role from query params this way
        return this.usersService.changeRole(id, dto);
    }

    @Post('/:id/block')
    usersBlock(@Param('id') id: string) {
        return this.usersService.block(id);
    }

    @Post('/:id/unblock')
    usersUnblock(@Param('id') id: string) {
        return this.usersService.unblock(id);
    }
}

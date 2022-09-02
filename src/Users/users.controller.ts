import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import updateUserDto from './DTO/update-user.dto';
import filterUserDto from 'src/utilites/Pagination/DTO/filter-user.dto';
import { CommunicationsService } from 'src/Communications/communications.service';
import filterCommDto from 'src/utilites/Pagination/DTO/filter-comm.dto';
import createCommDto from 'src/Communications/DTO/create-comm.dto';
import confirmUserCommDto from './DTO/confirm-user-comm.dto';
import changeRoleDto from './DTO/change-role.dto';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService,
        private commService: CommunicationsService) {
    }

    @Get()
    usersFind(@Query() dto: filterUserDto) {
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
    usersCommunicationsFind(@Param('id') id: string, @Query() dto: filterCommDto) {
        return this.commService.getAllUserComms({ userId: id, ...dto });
    }

    @Post('/:id/communications')
    usersCommunicationCreate(@Param('id') id: string, @Body() dto: createCommDto) {
        return this.usersService.createComm(id, dto);
    }

    //TODO: All following methods are not deeply implemented yet! 
    @Delete('/:id/communications/:commID')
    userCommunicationDelete(@Param('id') id: string, @Param('commID') commID: string) {
        return this.usersService.deleteComm(id, commID);
    }

    @Post('/:id/communications/:commID/confirm')
    usersCommunicationConfirm(@Param('id') id: string, @Body() dto: confirmUserCommDto) {
        return this.usersService.confirmComm(id, dto);
    }

    @Post('/:id/communications/:commID/confirm/send-code')
    usersCommunicationConfirmSendCode(@Param('id') id: string) {
        return this.usersService.sendCode(id);
    }

    @Post('/:id/change-role/:userRole')
    usersChangeRole(@Param('id') id: string, @Param('userRole') dto: changeRoleDto) {
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

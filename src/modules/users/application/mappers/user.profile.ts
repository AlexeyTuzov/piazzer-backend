import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, extend, Mapper, MappingConfiguration, MappingProfile } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/users.entity';
import CreateUserDto from '../DTO/createUser.dto';
import UpdateUserDto from '../DTO/updateUser.dto';

@Injectable()
export default class UserProfile extends AutomapperProfile {
    
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    get profile(): MappingProfile {
        return mapper => {
            createMap(mapper, User, CreateUserDto);
            createMap(mapper, User, UpdateUserDto);
        }
    }
}

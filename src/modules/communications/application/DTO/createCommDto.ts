import { AutoMap } from "@automapper/classes";
import CommunicationsTypes from "../../domain/enums/comm-types";
import { User } from '../../../users/domain/entities/users.entity';
import { Venue } from '../../../venues/domain/entities/venues.entity';
import { IsEnum, IsString } from "class-validator";

export default class CreateCommDto {

    @IsEnum(CommunicationsTypes)
    readonly type: CommunicationsTypes;

    @IsString()
    readonly value: string;

    @IsString()
    readonly description?: string;

    readonly user?: User;

    readonly venue?: Venue;
}

import { IsEnum, IsString } from "class-validator";
import { User } from "src/modules/users/domain/entities/users.entity";
import { Venue } from "src/modules/venues/domain/entities/venues.entity";
import ResourcesTypes from "../../domain/enums/resourceTypes";

export default class UpdateResourceDto {

    @IsString()
    readonly name?: string;
    
    @IsString()
    readonly size?: number;

    @IsEnum(ResourcesTypes)
    readonly type?: ResourcesTypes;

    @IsString()
    readonly link?: string;

    @IsString()
    readonly mimeType?: string;

    readonly user?: User;

    readonly venue?: Venue;
}
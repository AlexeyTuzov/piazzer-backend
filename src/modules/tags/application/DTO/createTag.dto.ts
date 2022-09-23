import { AutoMap } from "@automapper/classes";
import { IsString } from "class-validator";
import TagTypes from '../../domain/enums/tag-types';

export default class CreateTagDto {

    @IsString()
    readonly label?: string;

    @IsString()
    readonly value: string;

    @IsString()
    readonly description?: string;

    @IsString()
    readonly avatarId?: string;

    @IsString()
    readonly color?: string;

    @IsString()
    readonly type?: TagTypes;
}

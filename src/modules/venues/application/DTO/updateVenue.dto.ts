import { IsArray, IsNumber, IsString } from "class-validator";
import { Communication } from "src/modules/communications/domain/entities/communications.entity";
import CreateCoordinatesDto from "./createCoordinates.dto";

export default class UpdateVenueDto {

    @IsString()
    readonly title?: string;

    @IsString()
    readonly address?: string;

    @IsString()
    readonly coverId?: string;

    @IsString()
    readonly city?: string;

    @IsString()
    readonly contactPerson?: string;

    @IsString()
    readonly short?: string;

    @IsString()
    readonly coordinates?: CreateCoordinatesDto;

    readonly communications?: Communication[];

    @IsString()
    readonly description?: string;

    @IsArray()
    readonly propertiesIds?: string[];

    @IsArray()
    readonly attributesIds?: string[];

    @IsNumber()
    readonly capacity?: number;

    @IsNumber()
    readonly cost?: number;

    @IsArray()
    readonly resourcesIds?: string[];
}
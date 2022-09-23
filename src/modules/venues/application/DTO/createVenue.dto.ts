import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Communication } from "src/modules/communications/domain/entities/communications.entity";
import CreateCoordinatesDto from "./createCoordinates.dto";

export default class CreateVenueDto {

    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly address: string;

    @IsString()
    readonly coverId?: string;

    @IsString()
    @IsNotEmpty()
    readonly city: string;

    @IsString()
    @IsNotEmpty()
    readonly contactPerson: string;

    @IsString()
    readonly short?: string;

    readonly coordinates?: CreateCoordinatesDto;

    @IsArray()
    @IsNotEmpty()
    readonly communications: Communication[];

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
    readonly resourcesIds: string[];
}

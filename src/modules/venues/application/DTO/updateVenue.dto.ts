import { AutoMap } from "@automapper/classes";
import CreateCoordinatesDto from "./createCoordinates.dto";

export default class UpdateVenueDto {

    @AutoMap()
    readonly title?: string;

    @AutoMap()
    readonly address?: string;

    @AutoMap()
    readonly coverId?: string;

    @AutoMap()
    readonly city?: string;

    @AutoMap()
    readonly email?: string;

    @AutoMap()
    readonly contactPerson?: string;

    @AutoMap()
    readonly telephone?: string; 

    @AutoMap()
    readonly short?: string;

    @AutoMap()
    readonly coordinates?: CreateCoordinatesDto;

    @AutoMap()
    readonly description?: string;

    @AutoMap()
    readonly propertiesIds?: string[];

    @AutoMap()
    readonly attributesIds?: string[];

    @AutoMap()
    readonly capacity?: number;

    @AutoMap()
    readonly cost?: number;

    @AutoMap()
    readonly isBlocked?: boolean;

    @AutoMap()
    readonly isDraft?: boolean;

    @AutoMap()
    readonly resourcesIds?: string[];

    @AutoMap()
    readonly owner?: {
        name: string,
        position: string
    }
}
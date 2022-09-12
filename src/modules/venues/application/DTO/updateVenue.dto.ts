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
    short?: string;

    @AutoMap()
    coordinates?: CreateCoordinatesDto;

    @AutoMap()
    contactPerson?: string;

    @AutoMap()
    description?: string;

    @AutoMap()
    propertiesIds?: string[];

    @AutoMap()
    attributesIds?: string[];

    @AutoMap()
    capacity?: number;

    @AutoMap()
    cost?: number;

    @AutoMap()
    isBlocked?: boolean;

    @AutoMap()
    isDraft?: boolean;

    @AutoMap()
    resourcesIds?: string[];

    @AutoMap()
    owner?: {
        name: string,
        position: string
    }
}
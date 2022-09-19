import { AutoMap } from "@automapper/classes";
import { Communication } from "src/modules/communications/domain/entities/communications.entity";
import CreateCoordinatesDto from "./createCoordinates.dto";

export default class CreateVenueDto {

    @AutoMap()
    readonly title: string;

    @AutoMap()
    readonly address: string;

    @AutoMap()
    readonly coverId?: string;

    @AutoMap()
    readonly city: string;

    @AutoMap()
    readonly contactPerson: string;

    @AutoMap()
    readonly short?: string;

    @AutoMap()
    readonly coordinates?: CreateCoordinatesDto;

    @AutoMap(() => Communication)
    readonly communications: Communication[];

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
    readonly resourcesIds: string[];
}

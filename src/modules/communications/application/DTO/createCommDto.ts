import { AutoMap } from "@automapper/classes";
import CommunicationsTypes from "../../domain/enums/comm-types";

export default class CreateCommDto {

    @AutoMap()
    readonly type: CommunicationsTypes;

    @AutoMap()
    readonly value: string;

    @AutoMap()
    readonly description?: string;

    @AutoMap()
    readonly userId?: string;

    @AutoMap()
    readonly venueId?: string;
}

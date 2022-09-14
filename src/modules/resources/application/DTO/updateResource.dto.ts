import { AutoMap } from "@automapper/classes";
import ResourcesTypes from "../../domain/enums/resourceTypes";

export default class UpdateResourceDto {

    @AutoMap()
    readonly name?: string;
    
    @AutoMap()
    readonly size?: number;

    @AutoMap()
    readonly type?: ResourcesTypes;

    @AutoMap()
    readonly link?: string;

    @AutoMap()
    readonly mimeType?: string;

    @AutoMap()
    readonly belongingId?: string;
}
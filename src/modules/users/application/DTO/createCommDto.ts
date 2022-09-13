import { AutoMap } from "@automapper/classes";
import CommTypes from "../../domain/enums/comm-types";

export default class CreateCommDto {

    @AutoMap()
    readonly type: CommTypes;

    @AutoMap()
    readonly value: string;

    @AutoMap()
    readonly description: string;
}

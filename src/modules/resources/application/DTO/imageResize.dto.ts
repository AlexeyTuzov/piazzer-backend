import { AutoMap } from "@automapper/classes";
import FitTypes from "../../domain/enums/fitTypes";

export default class ImageResizeDto {

    @AutoMap()
    readonly w: number;

    @AutoMap()
    readonly h: number;

    @AutoMap()
    readonly fit: FitTypes;
}
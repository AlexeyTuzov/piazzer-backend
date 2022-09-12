import { AutoMap } from "@automapper/classes";

export default class CreateCoordinatesDto {

    @AutoMap()
    lat: number;

    @AutoMap()
    lon: number;
}
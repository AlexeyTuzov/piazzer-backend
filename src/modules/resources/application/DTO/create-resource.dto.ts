import { AutoMap } from "@automapper/classes";

export default class CreateResourceDto {

    @AutoMap()
    readonly name: string;

    @AutoMap()
    readonly file: string;
}
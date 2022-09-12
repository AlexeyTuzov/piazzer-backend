import { AutoMap } from "@automapper/classes";

export default class CreateTagDto {

    @AutoMap()
    readonly label: string;

    @AutoMap()
    readonly value: string;

    @AutoMap()
    readonly description: string;

    @AutoMap()
    readonly avatarId: string;

    @AutoMap()
    readonly color: string;

    @AutoMap()
    readonly type: string;
}
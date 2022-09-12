import { AutoMap } from "@automapper/classes";

export default class ResendCodeDto {

    @AutoMap()
    readonly email: string;
}
import { AutoMap } from "@automapper/classes";

export default class SignUpConfirmDto {

    @AutoMap()
    readonly secret: string;

    @AutoMap()
    readonly code: string;
}
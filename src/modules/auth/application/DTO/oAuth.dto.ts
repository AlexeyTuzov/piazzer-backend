import { AutoMap } from "@automapper/classes";

export default class OAuthDto {

    @AutoMap()
    readonly type: string;

    @AutoMap()
    readonly token: string;

    @AutoMap()
    readonly meta: {};
}
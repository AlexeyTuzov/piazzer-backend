import { AutoMap } from "@automapper/classes";

export default class RefreshTokenDto {

    @AutoMap()
    readonly refreshToken: string;
}
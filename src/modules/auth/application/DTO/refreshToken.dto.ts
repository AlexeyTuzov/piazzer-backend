import { IsString } from "class-validator";

export default class RefreshTokenDto {

    @IsString()
    readonly refreshToken: string;
}
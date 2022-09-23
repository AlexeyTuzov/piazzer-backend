import { IsNotEmpty, IsString } from "class-validator";

export default class AuthTokensDto {

    @IsString()
    readonly accessToken: string;

    @IsString()
    readonly refreshToken: string;
}
import { AutoMap } from "@automapper/classes";
import { IsNotEmpty, IsObject, IsString } from "class-validator";

export default class OAuthDto {

    @IsString()
    @IsNotEmpty()
    readonly type: string;

    @IsString()
    @IsNotEmpty()
    readonly token: string;

    @IsObject()
    readonly meta: {};
}
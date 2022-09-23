import { IsString } from "class-validator";

export default class SignUpConfirmDto {

    @IsString()
    readonly secret: string;

    @IsString()
    readonly code: string;
}
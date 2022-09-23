import { IsString } from "class-validator";

export default class ConfirmUserCommDto {

    @IsString()
    readonly code: string;
}

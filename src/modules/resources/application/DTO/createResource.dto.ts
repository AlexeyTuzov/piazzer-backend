import { IsString } from "class-validator";

export default class CreateResourceDto {

    @IsString()
    name?: string;

    @IsString()
    file?: string;
}
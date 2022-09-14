import { AutoMap } from "@automapper/classes";
import { IsEnum, IsString } from "class-validator";
import ResourcesTypes from "../../domain/enums/resourceTypes";

export default class CreateResourceDto {

    @IsString()
  name?: string;

  @IsString()
  link?: string;

  @IsString()
  size?: number;

  @IsEnum(ResourcesTypes)
  type?: ResourcesTypes;

  @IsString()
  mimeType?: string;

  file?: Buffer;
}
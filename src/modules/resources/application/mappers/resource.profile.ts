import { createMap, Mapper, MappingProfile } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { Resource } from "../../domain/entities/resources.entity";
import CreateResourceDto from "../DTO/createResource.dto";
import UpdateResourceDto from "../DTO/updateResource.dto";

@Injectable()
export default class ResourceProfile extends AutomapperProfile {

    constructor(@InjectMapper() mapper: Mapper){
        super(mapper);
    }

    get profile(): MappingProfile {
        return mapper => {
            createMap(mapper, Resource, CreateResourceDto)
            createMap(mapper, Resource, UpdateResourceDto)
        }
    }
}
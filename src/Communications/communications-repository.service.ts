import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import InternalServerError from "src/exceptions/internal-server-error";
import { Repository } from "typeorm";
import { Communication } from "./Communications.entity";
import createCommDto from "./DTO/create-comm.dto";

@Injectable()
export default class CommunicationsRepositoryService {

    constructor(@InjectRepository(Communication) private commRepository: Repository<Communication>){
    }

    async create(dto: createCommDto): Promise<string> {

        try {
            const newCommunication = this.commRepository.create(dto);
            await this.commRepository.save(newCommunication);
            return newCommunication.id;
        } catch (err) {
            throw new InternalServerError('User communication creation has been failed');
        }
    }
}
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import InternalServerError from "src/exceptions/internal-server-error";
import filterCommDto from "src/utilites/Pagination/DTO/filter-comm.dto";
import { Repository } from "typeorm";
import { Communication } from "./Communications.entity";
import createCommDto from "./DTO/create-comm.dto";

@Injectable()
export default class CommunicationsRepositoryService {

    constructor(@InjectRepository(Communication) private commRepository: Repository<Communication>){
    }

    async create(dto: createCommDto): Promise<Communication> {

        try {
            const newCommunication = this.commRepository.create(dto);
            await this.commRepository.save(newCommunication);
            return newCommunication;
        } catch (err) {
            throw new InternalServerError('User communication creation has been failed');
        }
    }

    async getAllUserComms(dto: filterCommDto){

        try {
            const userComms = await this.commRepository.find();
            //TODO Pagination and don't forget that {id: dto.userId}
            return userComms;
        } catch (err) {
            throw new InternalServerError('User communications request has been failed');
        }
    }

    async delete(id: string) {

        try {
            await this.commRepository.delete(id);
        } catch (err) {
            throw new InternalServerError('User communication deletion has been failed');
        }
    }
}
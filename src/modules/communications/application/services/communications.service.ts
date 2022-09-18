import { Injectable } from "@nestjs/common";
import { transacting } from "src/infrastructure/database/transacting";
import { EntityManager } from "typeorm";
import CreateCommDto from "../DTO/createCommDto";
import { Communication } from "../../domain/entities/communications.entity";
import FilterCommDto from "../../infrastructure/filterComm.dto";
import NotFoundError from "src/infrastructure/exceptions/not-found";

@Injectable()
export class CommunicationsService {

    async create(belongingId: string, dto: CreateCommDto, em?: EntityManager): Promise<string> {
        return transacting(async (em) => {
            const comm = em.getRepository(Communication).create();
            Object.assign(comm, { ...dto, belongingId });
            await em.save(comm);
            return comm.id;
        }, em);
    }

    async getFiltered(belongingId: string, dto: FilterCommDto, em?: EntityManager): Promise<Communication[]> {
        return transacting(async (em) => {
            return await em.getRepository(Communication).find({ where: { belonging: { id: belongingId } } });
        }, em);
    }

    async delete(id: string, em?:EntityManager): Promise<void> {
        return transacting(async (em) => {
            const comm = em.getRepository(Communication).findOne({where: {id}});

            if (!comm) {
                throw new NotFoundError('User communication not found');
            }

            await em.softDelete(Communication, id);
            return;
        }, em);

    }
}
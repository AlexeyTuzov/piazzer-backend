import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "./domain/entities/events.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Event])
    ]
})
export class EventsModule { }
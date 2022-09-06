import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunicationsService } from './application/services/communications.service';
import { Communication } from './domain/entities/Communications.entity';

@Module({
    providers: [
        CommunicationsService
    ],
    imports: [
        TypeOrmModule.forFeature([Communication])
    ],
    exports: [
        CommunicationsService
    ]
})
export class CommunicationsModule { }

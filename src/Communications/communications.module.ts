import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import CommunicationsRepositoryService from 'src/Communications/communications-repository.service';
import { CommunicationsService } from './communications.service';
import { Communication } from './Communications.entity';

@Module({
    providers: [
        CommunicationsService,
        CommunicationsRepositoryService
    ],
    imports: [
        TypeOrmModule.forFeature([Communication])
    ],
    exports: [
        CommunicationsService
    ]
})
export class CommunicationsModule { }
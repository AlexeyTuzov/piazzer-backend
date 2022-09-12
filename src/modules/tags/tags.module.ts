import { Module } from '@nestjs/common';
import { TagsController } from './controllers/tags.controller';
import { TagsService } from './application/services/tags.service';

@Module({
  controllers: [TagsController],
  providers: [TagsService]
})
export class TagsModule {}

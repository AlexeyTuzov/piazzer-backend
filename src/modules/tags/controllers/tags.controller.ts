import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import CreateTagDto from '../application/DTO/createTag.dto';
import UpdateTagDto from '../application/DTO/updateTag.dto';
import { TagsService } from '../application/services/tags.service';
import FilterTagsDto from '../infrastructure/filterTags.dto';

@Controller('tags')
export class TagsController {

    constructor(private tagsService: TagsService) { }

    @Post()
    tagsCreate(@Body() dto: CreateTagDto) {
        return this.tagsService.create(dto);
    }

    @Get()
    tagsFind(@Query() dto: FilterTagsDto) {
        return this.tagsService.getFiltered(dto);
    }

    @Get('/:id')
    tagsRead(@Param('id') id: string) {
        return this.tagsService.getById(id);
    }

    @Patch('/:id')
    tagsUpdate(@Param('id') id: string, @Body() dto: UpdateTagDto) {
        return this.tagsService.update(id, dto);
    }

    @Delete('/:id')
    tagsRemove(@Param('id') id: string) {
        return this.tagsService.delete(id);
    }
}

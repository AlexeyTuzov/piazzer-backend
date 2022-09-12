import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import CreateResourceDto from '../application/DTO/createResource.dto';
import ImageResizeDto from '../application/DTO/imageResize.dto';
import UpdateResourceDto from '../application/DTO/updateResource.dto';
import { ResourcesService } from '../application/services/resources.service';
import FilterResourcesDto from '../infrastructure/filter-resources.dto';

@Controller('resources')
export class ResourcesController {

    constructor(private resourcesService: ResourcesService) {
    }

    @Post()
    resourcesCreate(@Body() dto: CreateResourceDto) {
        return this.resourcesService.create(dto);
    }

    @Get()
    resourcesFind(@Query() dto: FilterResourcesDto) {
        return this.resourcesService.getFiltered(dto);
    }

    @Get('/:id')
    resourcesRead(@Param('id') id: string) {
        return this.resourcesService.getById(id);
    }

    @Patch('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    resourcesUpdate(@Param('id') id: string, @Body() dto: UpdateResourceDto) {
        return this.resourcesService.update(id, dto);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    resourcesRemove(@Param() id: string) {
        return this.resourcesService.delete(id);
    }

    @Get('/:id/resolve')
    @HttpCode(HttpStatus.SEE_OTHER)
    resourcesResolve(@Param() id: string) {
        return this.resourcesService.resolve(id);
    }

    @Get('/:id/image-resize')
    @HttpCode(HttpStatus.SEE_OTHER)
    resourcesImageResize(@Param('id') id: string, @Body() dto: ImageResizeDto) {
        return this.resourcesService.imageResize(id, dto);
    }
}

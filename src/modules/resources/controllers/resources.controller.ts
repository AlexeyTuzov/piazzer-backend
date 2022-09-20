import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import CreateResourceDto from '../application/DTO/createResource.dto';
import { ImageResizeDto } from '../application/DTO/imageResize.dto';
import UpdateResourceDto from '../application/DTO/updateResource.dto';
import { ResourcesService } from '../application/services/resources.service';
import FilterResourcesDto from '../infrastructure/filter-resources.dto';
import { Response } from 'express';

@Controller('resources')
export class ResourcesController {

    constructor(private resourcesService: ResourcesService) {
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    resourcesCreate(@Body() dto: CreateResourceDto, @UploadedFile() file) {
        const data: CreateResourceDto = {
            size: file?.size,
            name: dto.name ?? file?.originalname,
            mimeType: file?.mimetype,
            file: file?.buffer,
            type: dto.type,
            link: dto.link,
          };
      
        return this.resourcesService.create(data);
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
    resourcesRemove(@Param('id') id: string) {
        return this.resourcesService.delete(id);
    }

    @Get('/:id/resolve')
    @HttpCode(HttpStatus.SEE_OTHER)
    async resourcesResolve(@Param('id') id: string, @Res() res: Response) {
        const link = await this.resourcesService.resolve(id);
        return res.redirect(link);
    }

    @Get('/:id/image-resize')
    @HttpCode(HttpStatus.SEE_OTHER)
    @UsePipes(new ValidationPipe({
        transform: true,
        whitelist: true
    }))
    async resourcesImageResize(
        @Param('id') id: string, 
        @Query() dto: ImageResizeDto,
        @Res() res: Response,) {
            console.log(dto);
            // return dto;
         res.json({})   
        // const file = await this.resourcesService.imageResize(id, dto);
        // file.pipe(res);
    }
}

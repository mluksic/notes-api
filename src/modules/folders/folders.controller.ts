import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { FoldersService } from './folders.service';
import { FolderDTO } from './folder.dto';

@Controller('folders')
export class FoldersController {
  constructor(private readonly folderService: FoldersService) {}

  @Get()
  findAll(): Promise<FolderDTO[]> {
    return this.folderService.findAll();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createFolder(@Body() folder: FolderDTO): Promise<FolderDTO> {
    return this.folderService.createFolder(folder);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<FolderDTO> {
    return this.folderService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateFolder(
    @Param('id') id: number,
    @Body() folder: FolderDTO,
  ): Promise<FolderDTO> {
    return this.folderService.updateFolder(id, folder);
  }

  @Delete(':id')
  removeFolder(@Param('id') id: number) {
    return this.folderService.removeFolder(id);
  }
}

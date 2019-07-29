import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { Folder } from './folder.entity';
import { FolderDTO } from './folder.dto';

@Injectable()
export class FoldersService {
  constructor(
    @InjectRepository(Folder)
    private readonly folderRepository: Repository<Folder>,
  ) {}

  async findAll(): Promise<Folder[]> {
    return await this.folderRepository.find();
  }

  async createFolder(folder: FolderDTO): Promise<Folder> {
    const { name } = folder;
    const existingFolder = await this.folderRepository.findOne({
      where: { name },
    });
    if (existingFolder) {
      throw new HttpException('Folder already exist', HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.folderRepository.save(folder);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<Folder> {
    const folder = await this.folderRepository.findOne(id);
    if (!folder) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return folder;
  }

  async updateFolder(id: number, folder: FolderDTO): Promise<Folder> {
    const currentFolder = this.folderRepository.findOne(id);

    if (!currentFolder) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    try {
      await this.folderRepository.update({ id }, folder);
      return await this.folderRepository.findOne(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeFolder(id: number) {
    const folder = await this.folderRepository.findOne(id);
    if (!folder) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    try {
      await this.folderRepository.delete(id);
      return folder;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

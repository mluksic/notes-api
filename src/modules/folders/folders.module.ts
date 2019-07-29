import { Module } from '@nestjs/common';
import { FoldersController } from './folders.controller';
import { FoldersService } from './folders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Folder } from './folder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Folder])],
  controllers: [FoldersController],
  providers: [FoldersService],
})
export class FoldersModule {}

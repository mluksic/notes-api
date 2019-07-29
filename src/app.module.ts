import { Module } from '@nestjs/common';
import { FoldersModule } from './modules/folders/folders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './modules/notes/notes.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot(), FoldersModule, NotesModule, UsersModule],
  providers: [],
})
export class AppModule {}

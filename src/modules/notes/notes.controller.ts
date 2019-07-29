import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { NoteDTO } from './note.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly noteService: NotesService) {}

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('body') body: string,
    @Query('shared') shared: string,
    @Query('folder') folder: string,
  ): Promise<NoteDTO[]> {
    return this.noteService.findAll({ page, body, shared, folder });
  }

  @Post()
  @UsePipes(new ValidationPipe())
  createNote(@Body() note: NoteDTO): Promise<NoteDTO> {
    return this.noteService.createNote(note);
  }

  @Get(':id')
  getNote(@Param('id') id: number): Promise<NoteDTO> {
    return this.noteService.getNote(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateNote(@Param('id') id: number, @Body() note: NoteDTO): Promise<NoteDTO> {
    return this.noteService.updateNote(id, note);
  }

  @Delete(':id')
  removeNote(@Param('id') id: number) {
    return this.noteService.removeNote(id);
  }
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { NoteDTO } from './note.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
  ) {}

  async findAll({
    page = 1,
    body,
    shared,
    folder,
  }: {
    page: number;
    body: string;
    shared: string;
    folder: string;
  }): Promise<Note[]> {
    // not BP, ohh well
    const notes = await this.noteRepository.find();

    if (!shared && !body && !folder) {
      return await this.noteRepository.find({
        take: 10,
        skip: 10 * (page - 1),
      });
    }
    if (shared && (shared === 'private' || shared === 'public')) {
      return notes.filter(note => note.shared === shared);
    }
    if (body) {
      return notes.filter(note => note.body === body);
    }
    if (folder) {
      return notes.filter(note => note.folder.name === folder);
    }
    // if (body) {
    //   return await this.noteRepository.find({
    //     take: 10,
    //     skip: 10 * (page - 1),
    //     where: { body },
    //   });
    // }
    // if (shared && (shared === 'private' || shared === 'public')) {
    //   return await this.noteRepository.find({
    //     take: 10,
    //     skip: 10 * (page - 1),
    //     where: { shared },
    //   });
    // }
    // if (folder) {
    //   return await this.noteRepository.find({
    //     take: 10,
    //     skip: 10 * (page - 1),
    //     where: {
    //       folder: {
    //         name: folder,
    //       },
    //     },
    //   });
    // }
    // return await this.noteRepository.find({
    //   take: 10,
    //   skip: 10 * (page - 1),
    // });
  }

  async createNote(note: NoteDTO): Promise<Note> {
    try {
      return await this.noteRepository.save(note);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getNote(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne(id);
    if (!note) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    return note;
  }

  async updateNote(id: number, note: NoteDTO): Promise<Note> {
    const currentNote = await this.noteRepository.findOne(id);
    if (!currentNote) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    try {
      await this.noteRepository.update({ id }, note);
      return await this.noteRepository.findOne(id);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeNote(id: number): Promise<Note> {
    const note = await this.noteRepository.findOne(id);
    if (!note) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    try {
      await this.noteRepository.delete(id);
      return note;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

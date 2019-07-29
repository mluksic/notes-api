import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Note } from '../notes/note.entity';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Note, note => note.folder)
  notes: Note[];
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Folder } from 'src/modules/folders/folder.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column({ name: 'shared', default: 'private' })
  shared: string;

  @ManyToOne(type => Folder, folder => folder.notes, {
    nullable: false,
    eager: true,
  })
  @JoinColumn()
  folder: Folder;
}

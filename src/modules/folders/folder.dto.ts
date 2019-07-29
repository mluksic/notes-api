import { IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { NoteDTO } from '../notes/note.dto';

export class FolderDTO {
  @IsString()
  readonly name: string;

  @ValidateNested({ each: true })
  @Type(() => NoteDTO)
  readonly notes: NoteDTO[];
}

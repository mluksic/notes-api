import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { FolderDTO } from 'dist/src/modules/folders/folder.dto';
import { Type } from 'class-transformer';

export class NoteDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly body: string;

  @IsString()
  readonly shared: string = 'private';

  @ValidateNested()
  @Type(() => FolderDTO)
  readonly folder: FolderDTO;
}

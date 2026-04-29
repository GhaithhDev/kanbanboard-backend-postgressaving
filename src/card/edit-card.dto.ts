import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Priority } from 'src/enums/priority';

export class EditCardDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  priority?: Priority;

  @IsString()
  @IsNotEmpty()
  parentColumnId!: string;

  @IsOptional()
  externalWorker?: string;
}

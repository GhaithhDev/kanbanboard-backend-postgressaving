import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Priority } from 'src/enums/priority';

export class EditCardDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNotEmpty()
  @IsString()
  priority!: Priority;

  @IsString()
  @IsNotEmpty()
  parentColumnId!: string;

  @IsOptional()
  externalWorker?: string;
}

import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateExternalWorkerDto {
  @IsString()
  @IsNotEmpty()
  cardId!: string;

  @IsString()
  @IsNotEmpty()
  externalWorker!: string;
  
}

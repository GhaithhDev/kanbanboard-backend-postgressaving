import { IsString, IsNotEmpty, IsOptional } from 'class-validator'
import { Priority } from 'src/enums/priority';

export class EditCardDTO  {

    @IsString()
    title!: string;

    @IsNotEmpty()
    @IsString()
    columnId!: string
   
    @IsString()
    description!: string;
 
    @IsNotEmpty()
    @IsString()
    priority!: Priority;

    @IsNotEmpty()
    @IsString()
    cardId!: string

}
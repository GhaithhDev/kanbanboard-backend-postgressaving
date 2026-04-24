import { IsString, IsNotEmpty, IsOptional } from 'class-validator'
import { Priority } from 'src/enums/priority';

export class CreateCardDto  {
    @IsNotEmpty()
    @IsString()
    title!: string;

    @IsOptional()   
    @IsString()
    description?: string;

    @IsOptional()   
    @IsString()
    priority?: Priority;

    @IsNotEmpty()
    @IsString()
    parentColumnId!: string;
}
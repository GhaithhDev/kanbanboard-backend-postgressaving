import { IsString, IsNotEmpty, IsOptional } from 'class-validator'
import { Priority } from 'src/enums/priority';

export class CreateCardDTO  {
    @IsNotEmpty()
    @IsString()
    title!: string;
    @IsNotEmpty()
    @IsString()
    columnId!: string

    @IsOptional()   
    @IsString()
    description?: string;

    @IsOptional()   
    @IsString()
    priority?: Priority;
}
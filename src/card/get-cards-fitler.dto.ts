import { IsOptional, IsString, isString } from "class-validator";

export class GetCardsFilterDto {
    
    @IsString()
    @IsOptional()
    search?: string;

    @IsString()
    @IsOptional()
    priority?: string;

    @IsString()
    @IsOptional()
    columnId?: string;
}
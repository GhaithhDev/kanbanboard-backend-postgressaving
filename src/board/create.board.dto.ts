// get-board.dto.ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateBoardDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    colorNum!: string;
}
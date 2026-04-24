// get-board.dto.ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class CreateBoardDto {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNumber()
    colorNum!: number;
}
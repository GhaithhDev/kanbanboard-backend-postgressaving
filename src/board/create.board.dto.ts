// get-board.dto.ts
import { IsString, IsNotEmpty } from 'class-validator'

export class CreateBoardDto {
    @IsString()
    @IsNotEmpty()
    name!: string;
}
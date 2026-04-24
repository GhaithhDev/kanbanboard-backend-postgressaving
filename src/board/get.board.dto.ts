// get-board.dto.ts
import { IsString, IsNotEmpty } from 'class-validator'

export class GetBoardDto {
    @IsString()
    @IsNotEmpty()
    boardId!: string;
}
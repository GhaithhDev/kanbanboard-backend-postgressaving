// get-board.dto.ts
import { IsString, IsNotEmpty } from 'class-validator'

export class CreateColumnDTO {
    @IsString()
    @IsNotEmpty()
    columnName!: string;
    @IsString()
    @IsNotEmpty()
    boardId!: string;
}
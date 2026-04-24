// get-board.dto.ts
import { IsString, IsNotEmpty } from 'class-validator'

export class GetColumnDTO {
    @IsString()
    @IsNotEmpty()
    columnId!: string;
}
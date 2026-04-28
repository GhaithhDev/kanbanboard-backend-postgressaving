import { IsNotEmpty, IsString } from 'class-validator';

export class AddUserToBoardDto {
  @IsNotEmpty()
  @IsString()
  username!: string;
  @IsNotEmpty()
  @IsString()
  boardId!: string;
}

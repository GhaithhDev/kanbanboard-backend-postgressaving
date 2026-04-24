import { isString, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

const PASSWORD_REGULAR_EXPRESSION =
  /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
export class AuthCredentialsDto {

  @IsString()
  @MinLength(4, { message: 'Username must be more than 4 characters.' })
  @MaxLength(15, { message: 'Username must be more than 4 characters.' })
  username!: string;

  @IsString()
  @MinLength(8, { message: 'Password must be more than 8 characters.' })
  @MaxLength(32, { message: 'Password must be less than 32 characters.' }) //TODO: GET ALL THESE MIN MAX VALUES IN A CONFIGURATION ENUM
  @Matches(PASSWORD_REGULAR_EXPRESSION, { message: 'Password is weak' }) //TODO: call a function to check which of the expression rules was broken and send the message accordingly
  password!: string;
}

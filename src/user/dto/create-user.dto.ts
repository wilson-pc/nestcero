import {
  IsString,
  IsInt,
  IsEmail,
  minLength,
  Length,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @Length(3, 20)
  @IsString()
  name: string;

  @Length(3, 12)
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(4)
  password: string;
}

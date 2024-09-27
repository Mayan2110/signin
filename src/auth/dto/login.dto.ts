import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, } from 'class-validator';

export class LoginDto {

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;


}

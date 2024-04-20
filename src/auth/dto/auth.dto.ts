import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({ example: 'john_doe@example.com', description: 'Email of the user' })
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 20, { message: 'Password should be between 5 to 20 characters' })
  @ApiProperty({ example: 'password123', description: 'Password of the user' })
  public password: string;
}

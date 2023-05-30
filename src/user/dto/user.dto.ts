import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';


export class RegisterUserDto {
  @ApiProperty({ example: 'john_snow', description: 'The username of the user' })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'john@example.com', description: 'The email address of the user' })
  @IsEmail()
  email: string;
}


export class LoginUserDto {
  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'john@example.com', description: 'The email address of the user' })
  @IsEmail()
  email: string;
}

export class RefreshTokenDto {
  @ApiProperty({ example: 'refresh_token_string', description: 'The refresh token' })
  @IsString()
  refreshToken: string;
}

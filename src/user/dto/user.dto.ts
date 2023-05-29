import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEmail()
  email: string;
}

export class LoginUserDto {
  @IsString()
  @MinLength(6)
  password: string;

  @IsEmail()
  email: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}

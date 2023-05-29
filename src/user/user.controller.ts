import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto, RefreshTokenDto, RegisterUserDto } from './dto/user.dto';
import { User } from './schemas/user.schema';

@Controller('auth')
export class UserController {
    constructor( private readonly userService: UserService) {}

    @Post('register')
    async registerUser(
        @Body(ValidationPipe) registerUserDto: RegisterUserDto
    ) :Promise<User> {
        return this.userService.registerUser(registerUserDto)
    }

    @Post('login')
    async loginUser(
        @Body(ValidationPipe) loginUserDto: LoginUserDto
    ): Promise<User> {
        return this.userService.loginUser(loginUserDto)
    }

    @Post('refresh')
    async refreshAccessToken(
        @Body(ValidationPipe) refreshTokenDto: RefreshTokenDto
    ): Promise<User> {
        return this.userService.refreshAccessToken(refreshTokenDto)
    }

    @Get('current')
    async getCurrentUser(@Req() req):Promise<User> {
        return await this.userService.getCurrent(req)
    }

    @Post('logout')
    async logOut(@Req() req): Promise<User> {
        return this.userService.logOutUser(req)
    }
}

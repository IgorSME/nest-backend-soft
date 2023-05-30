import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto, RefreshTokenDto, RegisterUserDto } from './dto/user.dto';
import { User } from 'src/entities/user.entity'; 
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Authentication') 
export class UserController {
    constructor( private readonly userService: UserService) {}

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    async registerUser(
        @Body(ValidationPipe) registerUserDto: RegisterUserDto
    ) :Promise<User> {
        return this.userService.registerUser(registerUserDto)
    }

    @Post('login')
    @ApiOperation({ summary: 'Log in an existing user' })
    async loginUser(
        @Body(ValidationPipe) loginUserDto: LoginUserDto
    ): Promise<User> {
        return this.userService.loginUser(loginUserDto)
    }

    @Post('refresh')
    @ApiOperation({ summary: 'Refresh access token' })
    @UseGuards(AuthGuard)
    async refreshAccessToken(
        @Body(ValidationPipe) refreshTokenDto: RefreshTokenDto
    ): Promise<User> {
        return this.userService.refreshAccessToken(refreshTokenDto)
    }

    @Get('current')
    @ApiOperation({ summary: 'Get current user' }) 
    @UseGuards(AuthGuard)
    async getCurrentUser(@Req() req):Promise<User> {
        return await this.userService.getCurrent(req)
    }

    @Post('logout')
    @ApiOperation({ summary: 'Log out user' })
    @UseGuards(AuthGuard)
    async logOut(@Req() req): Promise<User> {
        return this.userService.logOutUser(req)
    }
}

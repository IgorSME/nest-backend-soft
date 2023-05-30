import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/user.entity'; 
import {  Equal, Repository } from 'typeorm'; 
import { LoginUserDto, RefreshTokenDto, RegisterUserDto } from './dto/user.dto';
import createToken from './utils/createToken';
import { JwtService } from '@nestjs/jwt';
require('dotenv').config();

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly jwtService: JwtService) {}

async registerUser (registerUserDto: RegisterUserDto): Promise<User> {
    const { username, email, password} = registerUserDto;
    const user = await this.userRepository.findOne({ where: { email } });
    
    if(user){
        throw new NotFoundException('User not found');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.create({
        username,
        email,  password: hashedPassword
    })
    const { accessToken , refreshToken} = createToken(newUser.id)
    newUser.accessToken = accessToken;
  newUser.refreshToken = refreshToken;
    await this.userRepository.save(newUser)
    return newUser;
}

async loginUser( loginUserDto: LoginUserDto): Promise<User> {
    const { email, password} = loginUserDto;
    const user = await this.userRepository.findOne({ where: {email}})

    if(!user ){
        throw new Error('Email or password wrong')
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw new Error('Email or password wrong')
    }
    const { accessToken, refreshToken } = createToken(user.id);
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await this.userRepository.save(user);
    return user;
}

async refreshAccessToken(refreshTokenDto: RefreshTokenDto): Promise<User> {
    try {
        const {refreshToken} = refreshTokenDto;
    const {id} = this.jwtService.verify(refreshTokenDto.refreshToken, {secret: process.env.SECRET_KEY_REFRESH}) as { id: string};

    return this.userRepository.findOne({where: {id: Equal(Number(id))}});
    } catch (error) {
        throw new UnauthorizedException('Token expired or invalid');
    }
}

async getCurrent( req: {user:{username: string, email: string }}):Promise<User>{
    const { username, email} = req.user;
    const user = await this.userRepository.findOne({ where : {username, email}})
    return user;
}

async logOutUser(req: { user: {
    _id: number,
      email: string,
    username:string
  };}):Promise<User>{
    const { _id} = req.user;
   const user = await this.userRepository.findOne({where: { id: _id }})
    if(!user) {
        throw new NotFoundException('User not found')
    }
    user.accessToken = '';
    user.refreshToken = '';
    await this.userRepository.save(user)

    const updatedUser = await this.userRepository.findOne({where: { id: _id }})
    
    return updatedUser;
}

}

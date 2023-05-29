import { Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument} from './schemas/user.schema'
import { Model } from 'mongoose';
import { LoginUserDto, RefreshTokenDto, RegisterUserDto } from './dto/user.dto';
import createToken from './utils/createToken';
import { JwtService } from '@nestjs/jwt';
require('dotenv').config();

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>, private readonly jwtService: JwtService) {}

async registerUser (registerUserDto: RegisterUserDto): Promise<User> {
    const { username, email, password} = registerUserDto;
    const user = await this.userModel.findOne({email});
    
    if(user){
        throw new Error('401');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userModel.create({
        username,
        email,  password: hashedPassword
    })
    const { accessToken , refreshToken} = createToken(newUser.id)
    newUser.accessToken = accessToken;
  newUser.refreshToken = refreshToken;
    await this.userModel.findByIdAndUpdate(newUser._id, {
        accessToken,
        refreshToken
    })
    return newUser.save();
}

async loginUser( loginUserDto: LoginUserDto): Promise<User> {
    const { email, password} = loginUserDto;
    const user = await this.userModel.findOne({email})

    if(!user ){
        throw new Error('Email or password wrong')
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw new Error('Email or password wrong')
    }
    const { accessToken, refreshToken } = createToken(user.id);
    await this.userModel.findByIdAndUpdate(user.id, { accessToken, refreshToken });
    return user.save();
}

async refreshAccessToken(refreshTokenDto: RefreshTokenDto): Promise<User> {
    try {
        const {refreshToken} = refreshTokenDto;
    const {id} = this.jwtService.verify(refreshTokenDto.refreshToken, {secret: process.env.SECRET_KEY_REFRESH}) as { id: string};

    return this.userModel.findOne({_id: id}).exec();
    } catch (error) {
        throw new UnauthorizedException('Token expired or invalid');
    }
}

async getCurrent( req: {user:{username: string, email: string }}):Promise<User>{
    const { username, email} = req.user;
    const user = await this.userModel.findOne({username, email})
    return user;
}

async logOutUser(req: { user: {
    _id: string,
      email: string,
    username:string
  };}):Promise<User>{
    const { _id} = req.user;
    console.log(_id);
    
     await this.userModel.findByIdAndUpdate(_id, {
        accessToken: "", refreshToken: ""
    })
    const user = await this.userModel.findById(_id)
    return user;
}

}

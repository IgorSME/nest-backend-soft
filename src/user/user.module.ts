import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../entities/user.entity'; 
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([User]), 
  JwtModule.register({  secret: process.env.ACCESS_TOKEN_PRIVATE_KEY || 'SECRET',
  signOptions: {
    expiresIn: '24h',
  },})],
  providers: [UserService, User],
  controllers: [UserController],
  exports: [UserService, JwtModule]
})
export class UserModule {}

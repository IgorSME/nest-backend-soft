import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class AuthGuard implements CanActivate {
    constructor ( private readonly jwtService: JwtService){}

     canActivate(context: ExecutionContext): boolean {
        
        const request = context.switchToHttp().getRequest();
        try {
            const { authorization = "" } = request.headers;
            
            
            const [bearer, token] = authorization.split(" ");
            if (bearer !== "Bearer" || !token) {
                        throw new UnauthorizedException( "Not authorized");
            }
            console.log('request', process.env.SECRET_KEY_ACCESS);
         
                const user =  this.jwtService.verify(token, {secret: process.env.SECRET_KEY_ACCESS});
           
            console.log('user', user);
            
            
             request.user = user
             return true;

        } catch (error) {
            throw new UnauthorizedException( "Not authorized");
        }
      }
}

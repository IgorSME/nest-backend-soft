import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JwtService } from '@nestjs/jwt';


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
            console.log('request', request.user);
            const user = this.jwtService.verify(token);
            console.log('user', user);
            
            
             request.user = user
             return true;

        } catch (error) {
            throw new UnauthorizedException( "Not authorized");
        }
      }
}

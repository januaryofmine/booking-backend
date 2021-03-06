import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ){
    const request = context.switchToHttp().getRequest();
    if(!request.headers.authorization) {
       return false;
    }
    request.user = await this.validateToken(request.headers.authorization);
    return true;
  }

  async validateToken(auth: string) {
     if(auth.split(' ')[0] !== 'Bearer') { // jsonwebtoken
        throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
     }

     const token = auth.split(' ')[1];
     try {
      const decode = await jwt.verify(token, process.env.SECRET);
      return decode;
     } catch (err) {
      const message = 'Token error: ' + (err.message || err.name);
      throw new HttpException(message, HttpStatus.FORBIDDEN);
     }
  }
}

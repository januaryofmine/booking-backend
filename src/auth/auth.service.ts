import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, of } from 'rxjs';
import { User } from 'src/interfaces/users.interfaces';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService){}

    generateJWT(user: User): Observable <string> {
        return from(this.jwtService.signAsync({user}));
    }

    comparePasswords(newPassword: string, passwortHash: string): Observable <any | boolean> {
        return of<any | boolean>(bcrypt.compare(newPassword, passwortHash));
    }

}

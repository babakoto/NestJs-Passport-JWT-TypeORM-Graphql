import { Injectable, ForbiddenException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginInput } from 'src/users/inputs/login.input';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './interface/payload.interface';
import { AccessToken } from './models/access_token';

@Injectable()
export class AuthService {

    constructor(
        private userService:UsersService,
        private jwtService:JwtService
        ){

    }

    async valideUser(login:LoginInput){
        const {email,password} = login;
        const user = await this.userService.findByEmail(email);
        if(user && user.password === password) return user;
        return null;
    }

    async findById(id:string){
        return await this.userService.findById(id);
    }

    async login(loginInput:LoginInput){
       const user = await this.valideUser(loginInput);
       if(user){
        const payload:Payload = {
            email:user.email,
            id:user.id,
            name:user.name
        };
        const token = new AccessToken();
        token.access_token = await this.jwtService.sign(payload);
        if(token.access_token){
            return token;
        }
        throw new ForbiddenException();

       }else{
           throw new ForbiddenException();
       }

    }


}

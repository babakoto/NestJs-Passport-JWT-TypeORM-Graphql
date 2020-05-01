import {PassportStrategy} from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { AuthService } from "../auth.service";
import { Payload } from "../interface/payload.interface";
import { UnauthorizedException, Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private authService: AuthService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "1234",
        });
    }


    async validate(payload:Payload){
        console.log(">>>>",payload)
       const user = await this.authService.findById(payload.id);
      console.log(">>>>",user)
       if(!user){
        throw new UnauthorizedException();
       }else{
        return user;
       }

    }
}
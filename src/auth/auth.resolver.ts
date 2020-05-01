import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from 'src/users/inputs/login.input';
import { AccessToken } from './models/access_token';

@Resolver('Auth')
export class AuthResolver {
    constructor(private authService:AuthService){}

    @Mutation(returns => AccessToken)
    async login(@Args("input") input:LoginInput){
        return await this.authService.login(input);
    }
}

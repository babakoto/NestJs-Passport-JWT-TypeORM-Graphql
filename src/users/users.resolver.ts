import { Resolver, Query, Args, Mutation,Subscription } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { SignUpInput } from './inputs/signup.input';
import { GqlAuthGuard } from 'src/auth/guards/gql.guard';
import { UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Resolver('Users')
export class UsersResolver {

    constructor(private userService:UsersService){}

    @Query(()=>[User])
    @UseGuards(GqlAuthGuard,AdminGuard)
    async findUsers(){
        return await this.userService.finAll();
    }

    @Mutation(returns => User)
    async createUser(@Args("user") user:SignUpInput){
         return await this.userService.createUser(user);

    }


    @Query(returns => User)
    async findById(@Args("id")id:string){
        return await this.userService.findById(id);
    }

    @Subscription(returns => User)
    @UseGuards(GqlAuthGuard)
    userCreated(){
        return this.userService.userCreated();
    }
}

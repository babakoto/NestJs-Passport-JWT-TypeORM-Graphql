import { Injectable, ForbiddenException } from '@nestjs/common';
import { UserRepo } from './repositories/user.repository';
import {InjectRepository} from "@nestjs/typeorm";
import { User } from './models/user.model';
import { SignUpInput } from './inputs/signup.input';
import { Role } from './models/role.enum';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();
@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserRepo)
        private readonly userRepo:UserRepo
        ){}


        async createUser(signUpInput:SignUpInput){
            const {name,email,password} = signUpInput;
            const user = new User()
            user.name = name;
            user.email = email;
            user.password = password;
            user.role = Role.CLIENT;
            const saved =  await this.userRepo.save(user);
            if(saved){
                console.log("<< Saved>>",saved)
                pubSub.publish("created",{created:saved});
                return saved;
            }
        }

        async finAll(){
            return await this.userRepo.find();
        }

        async findById(id:string){
            const user = await this.userRepo.findOne({id});
            if(!user) return null;
            return user;
        }

        async findByEmail(email:string){
            const user = await this.userRepo.findOne({email});
            if(!user) return null;
            return user;
            
        }

        async userCreated(){
            return pubSub.asyncIterator("userCreated")
        }



}

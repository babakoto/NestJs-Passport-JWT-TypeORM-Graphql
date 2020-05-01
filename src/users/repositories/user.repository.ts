import { Repository, EntityRepository } from "typeorm";
import { User } from "../models/user.model";

@EntityRepository(User)
export class UserRepo extends Repository<User>{}
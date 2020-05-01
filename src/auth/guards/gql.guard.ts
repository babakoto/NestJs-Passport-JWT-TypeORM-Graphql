import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export class GqlAuthGuard extends AuthGuard('jwt'){

    constructor(private authService: AuthService){
        super();
    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const { req, connection } = ctx.getContext();
        console.log("Data :",req.headers); 
        return req;
      }
}
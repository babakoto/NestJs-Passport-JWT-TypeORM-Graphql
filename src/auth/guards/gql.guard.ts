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
        // req used in http queries and mutations, connection is used in websocket subscription connections, check AppModule
        const { req, connection } = ctx.getContext();
       /* const data = (connection && connection.context && connection.context.headers)
        ? connection.context
        : req;*/
        console.log("Data :",req); 
        // if subscriptions/webSockets, let it pass headers from connection.context to passport-jwt
        return req;
      }
}
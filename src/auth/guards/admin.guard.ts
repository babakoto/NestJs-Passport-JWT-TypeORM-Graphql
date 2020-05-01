import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { GqlExecutionContext } from "@nestjs/graphql";


export class AdminGuard implements CanActivate{
    canActivate(context:ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().connexion;
        console.log("Guard",req);
        return true;
      
    }

}
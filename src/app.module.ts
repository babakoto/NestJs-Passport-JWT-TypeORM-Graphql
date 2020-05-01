import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile:'schema.gql',
      installSubscriptionHandlers: true,
      context: ({ req, connection }) => connection ?
       {
         req:

         
           {
             headers:{
               authorization:connection.context["Authorization"]
               ?connection.context["Authorization"]
               :connection.context["authorization"]}
            }
        }:{req}
    }),
    AuthModule,
    UsersModule,
  ],
  providers: [AppService],
})
export class AppModule {}

//context: ({ req, connection }) => connection ? { req: { headers: connection.context } } : { req },
//context: ({ req,res }) => ({ req,res }),
//context: ({ req, connection }) => connection ? { req: connection.context } : { req }
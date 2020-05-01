import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from "@nestjs/jwt";

@Module({
  providers: [AuthResolver, AuthService,UsersService,JwtStrategy],
  imports:
  [
    UsersModule,
    JwtModule.register({
      secret:"1234",
      signOptions:{expiresIn:"7d"}
    })
  ],
  exports:[AuthService,AuthModule]
})
export class AuthModule {}

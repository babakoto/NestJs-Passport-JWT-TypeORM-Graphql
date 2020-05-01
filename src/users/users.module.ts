import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepo } from './repositories/user.repository';

@Module({
  providers: [UsersService, UsersResolver],
  imports:[TypeOrmModule.forFeature([UserRepo])],
  exports:[UsersModule,TypeOrmModule]
})
export class UsersModule {}

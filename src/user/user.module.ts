import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { prismaModule } from 'src/prisma/prisma.module';
import { UserController } from './users.controller';

@Module({
  imports: [prismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule { }

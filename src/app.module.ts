import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UsersModule } from './user/user.module';
// import { AuthModule } from './auth/auth.module';
import { prismaModule } from './prisma/prisma.module';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [prismaModule, UsersModule, AuthModule],

  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule { }

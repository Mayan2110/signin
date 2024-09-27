import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersModule } from 'src/user/user.module';
import { prismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [UsersModule, PassportModule, prismaModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: { expiresIn: '1h' }
    })
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy, PrismaService],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy]
})
export class AuthModule { }



// // src/auth/auth.module.ts
// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { AuthService } from './auth.service';
// // import { AuthController } from './auth.controller';

// @Module({
//   imports: [
//     PassportModule,
//     JwtModule.register({
//       secret: 'your-secret-key', // Use environment variables in production
//       signOptions: { expiresIn: '60m' }, // Token expiration time
//     }),
//   ],
//   providers: [AuthService],
//   // controllers: [AuthController],
// })
// export class AuthModule { }





// // src/auth/auth.module.ts
// import { Module } from '@nestjs/common';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { JwtStrategy } from './strategy/jwt.strategy';
// import { prismaModule } from 'src/prisma/prisma.module';
// import { PrismaService } from 'src/prisma/prisma.service';


// @Module({
//   imports: [
//     PassportModule,
//     JwtModule.register({
//       secret: 'your-secret-key', // Use environment variables in production
//       signOptions: { expiresIn: '60m' }, // Token expiration time
//     }),
//   ],
//   providers: [AuthService, JwtStrategy, PrismaService],
//   controllers: [AuthController],
// })
// export class AuthModule { }

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtservice: JwtService,
    private prisma: PrismaService) { }
  async login(username: string, password: string): Promise<{ message: string, access_token: String }> {
    const user = await this.prisma.user.findFirst({
      where: { username }
    });

    if (!user) {
      throw new BadRequestException('Invalid UserName');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new BadRequestException('Invalid Password');
    }
    const payload = { sub: user.id, username: user.username, password: user.password, email: user.email };
    return {
      message: 'Login successfully!!!',
      access_token: this.jwtservice.sign(payload),
    }
  }

  async validateUser(username: string, Password: string): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: {
        username
      }
    });
  }
}





// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { UserService } from 'src/user/users.service';

// @Injectable()
// export class AuthService {
//   constructor(
//     private jwtService: JwtService,
//     private usersService: UserService,
//     private prisma: PrismaService,
//   ) { }

//   // Method to sign in the user and generate JWT token
//   async signIn(username: string, pass: string): Promise<any> {
//     const user = await this.usersService.findOne(username);

//     // Check if user exists and password matches
//     if (!user || user.password !== pass) {
//       throw new UnauthorizedException('Invalid username or password');
//     }

//     // Omit password from the result
//     const { password, ...result } = user;

//     // Generate the payload for the JWT
//     const payload = { sub: user.id, username: user.username }; // Use `id` as the subject (primary key)

//     // Generate and return the JWT token
//     const access_token = await this.jwtService.signAsync(payload);
//     return {
//       access_token,
//     };
//   }
//   async validateUser(username: string, Password: string): Promise<any> {

//     const user = await this.prisma.user.findFirst({
//       where: {
//         username
//       }
//     });
//   }
// }





// // import { Injectable, UnauthorizedException } from '@nestjs/common';
// // import { JwtService } from '@nestjs/jwt';
// // import { PrismaService } from 'src/prisma/prisma.service';
// // import { UserService } from 'src/user/users.service';


// // @Injectable()
// // export class AuthService {
// //   constructor(private jwtService: JwtService,
// //     private usersService: UserService,
// //     private prisma: PrismaService,
// //   ) { }

// //   async signIn(username: string, pass: string): Promise<any> {
// //     const user = await this.usersService.findOne(username);
// //     if (user?.password !== pass) {
// //       throw new UnauthorizedException();
// //     }
// //     const { password, ...result } = user;
// //     // TODO: Generate a JWT and return it here
// //     // instead of the user object
// //     return result;
// //     const payload = { sub: user.username, username: user.username };
// //     return {
// //       access_token: await this.jwtService.signAsync(payload),
// //     }
// //   }
// //   async validateUser(username: string, Password: string): Promise<any> {

// //     const user = await this.prisma.user.findFirst({
// //       where: {
// //         username
// //       }
// //     });
// //   }
// // }
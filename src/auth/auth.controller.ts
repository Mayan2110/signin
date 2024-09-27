import { Body, Controller, Post, HttpCode, HttpStatus, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginDto) {
    return this.authService.login(signInDto.username, signInDto.password);
  }

}



// src/auth/auth.controller.ts
// import { Controller, Post, Body } from '@nestjs/common';
// import { AuthService } from './auth.service';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) { }

//   // Login endpoint that calls the AuthService to generate a JWT
//   @Post('login')
//   async login(@Body() body: { userId: string }) {
//     // Call the AuthService's login method with the provided userId
//     return this.authService.login(body.userId);
//   }
// }

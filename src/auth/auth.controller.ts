import { Body, Controller, Post, HttpCode, HttpStatus, Get, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { jwtAuthGuard } from './Guards/Jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Post('login')
  signIn(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto.username, LoginDto.password);
  }
  @UseGuards(jwtAuthGuard)
  @ApiBearerAuth()   
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
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

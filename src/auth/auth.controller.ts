import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'User sign up' })
  @ApiResponse({ status: 201, description: 'User signed up successfully' })
  @ApiResponse({ status: 400, description: 'Email is already exists' })
  async signup(@Body() dto: AuthDto) {
    return await this.authService.signUp(dto);
  }

  @Post('signin')
  @ApiOperation({ summary: 'User sign in' })
  @ApiResponse({ status: 200, description: 'Logged in successfully' })
  @ApiResponse({ status: 400, description: 'Wrong email or password' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async signIn(@Body() dto: AuthDto, @Req() req: Request, @Res() res: Response) {
    return await this.authService.signIn(dto, req, res);
  }

  @Get('signout')
  @ApiOperation({ summary: 'User sign out' })
  @ApiResponse({ status: 200, description: 'Logged out successfully' })
  async signOut(@Req() req: Request, @Res() res: Response) {
    const result = await this.authService.signOut(req, res);
    return res.send(result);
  }
}

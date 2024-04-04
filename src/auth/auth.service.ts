import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'prisma/prisma.service';
import { hashingPassword, comparingPassword } from './authHelper';

import {JwtService} from "@nestjs/jwt"
import { Jwt_Secret } from 'src/utils/constant';
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService,private readonly jwt:JwtService) {}
  // Sign up Function
  async signUp(dto: AuthDto) {
    const { email, password } = dto;
    const foundUser = await this.prisma.user.findUnique({ where: { email } });
    if (foundUser) {
      throw new BadRequestException('Email is already exists');
    }
    const hashedPassword = await hashingPassword(password);
    await this.prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });
    return `SignUp with ${email}`;
  }

  // Sign In Function
  async signIn(dto: AuthDto) {
    const { email, password } = dto;
    // Check Email
    const foundUser = await this.prisma.user.findUnique({ where: { email } });
    if (!foundUser) {
      throw new BadRequestException('Wrong Email or Passwprd');
    }
    // Check Password
    const isMAtch = await comparingPassword({
        password,
        hashed: foundUser.hashedPassword,
    });
    if (!isMAtch) {
      throw new BadRequestException('Wrong Email or Passwprd');
    }
    const token=await this.signToken({id:foundUser.id,email:foundUser.email});
    return {token};
  }
  // Function for creating token when login
  signToken(args: { id: string; email: string }) {
    const payload=args;
   return  this.jwt.signAsync(payload,{secret:Jwt_Secret})
}
}

import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'prisma/prisma.service';
import { hashingPassword, comparingPassword } from './authHelper';

import {JwtService} from "@nestjs/jwt"
import { Jwt_Secret } from 'src/utils/constant';
import { Request, Response } from 'express';
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService,private jwt:JwtService) {}
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
  async signIn(dto: AuthDto,req:Request,res:Response) {
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
    if (!token) {
      throw new ForbiddenException();
    }
    res.cookie("token",token)
    return res.send({message:"Logged in Successfully"});
  }
//   sign out 
async signOut(req:Request,res:Response){
res.clearCookie("token")
return "Logged out"
}
  // Function for creating token when login
  async signToken(args: { id: string; email: string }) {
    const payload=args;
   return await  this.jwt.signAsync(payload,{secret:Jwt_Secret})
}
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  // Sign up Function
  async signUp(dto: AuthDto) {
    const { email, password } = dto;
    const foundUser = await this.prisma.user.findUnique({ where: { email } });
    if (foundUser) {
      throw new BadRequestException('Email is already exists');
    }
    const hashedPassword = await this.hashingPassword(password);
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
    const isMAtch = await this.comparingPassword({
        password,
        hashed: foundUser.hashedPassword,
    });
    if (!isMAtch) {
      throw new BadRequestException('Wrong Email or Passwprd');
    }
    return `SignIn with ${email}`;
  }
  // Function for hashing passwords
  async hashingPassword(params: string) {
    const saltOrRounds = 10;

    const hashedPass = await bcrypt.hash(params, saltOrRounds);
    return hashedPass;
  }

  // Function for comparing between the password with hashed password
  async comparingPassword(args: { password: string; hashed: string }) {
    return await bcrypt.compare(args.password, args.hashed);
  }
}

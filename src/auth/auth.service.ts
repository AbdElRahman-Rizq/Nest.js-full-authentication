import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'prisma/prisma.service';
@Injectable()
export class AuthService {
    constructor(private readonly prisma:PrismaService){}
    async signUp(dto:AuthDto){
       const {email,password}=dto;
       const foundUser=await this.prisma.user.findUnique({where:{email}})
       if (foundUser) {
        throw new BadRequestException("Email is already exists")
       }
       const hashedPassword=await this.hashingPassword(password)
       await this.prisma.user.create({
        data:{
            email,hashedPassword
        }
       })
        return `SignUp with ${email}`
    }

    // Function for hashing passwords
    async hashingPassword(params:string) {
        const saltOrRounds = 10;

const hashedPass = await bcrypt.hash(params, saltOrRounds);
        return hashedPass
    }
}

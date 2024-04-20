import { ForbiddenException, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class UsersService {
  constructor(private readonly prisma:PrismaService){}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }
  // --------------------------------
// Get user by ID
async findOne(id: number,req:Request) { // Change the type of id to number
  const foundUser = await this.prisma.user.findUnique({
    where: {
      id: id.toString() // Convert id to a string before passing it to findUnique
    }
  });
// If user.id Not found
  if (!foundUser) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }
// Checing the Token to forbidden any user to see the data
const decodedUser=req.user as{id:string,email:string} // From the token (Payload in validate in jwt.strategy.ts file) 
if(foundUser.id!=decodedUser.id){
throw new ForbiddenException("Not authorized")
}
delete foundUser.hashedPassword // Display the data without the hased password
  return foundUser;
}
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

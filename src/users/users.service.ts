import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma:PrismaService){}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }
// Get user by ID
async findOne(id: number) { // Change the type of id to number
  const foundUser = await this.prisma.user.findUnique({
    where: {
      id: id.toString() // Convert id to a string before passing it to findUnique
    }
  });

  if (!foundUser) {
    throw new NotFoundException(`User with ID ${id} not found`);
  }

  return foundUser;
}
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

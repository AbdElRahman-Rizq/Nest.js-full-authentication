// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthService } from '../auth.service';
// import { PrismaService } from '../../../prisma/prisma.service';
// import { AuthDto } from '../dto/auth.dto';
// import { BadRequestException } from '@nestjs/common';

// describe('AuthService', () => {
//   let service: AuthService;
//   let prismaService: PrismaService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [AuthService, PrismaService],
//     }).compile();

//     service = module.get<AuthService>(AuthService);
//     prismaService = module.get<PrismaService>(PrismaService);
//   });

//   afterEach(() => {
//     jest.clearAllMocks(); // Clear all mocks after each test
//   });

//   it('should sign up successfully', async () => {
//     // Arrange
//     const dto: AuthDto = {
//       email: 'test@example.com',
//       password: 'secure_password123',
//     };

//     // Mock the PrismaService's findUnique method to return null, indicating the email does not exist
//     jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

//     // Mock the PrismaService's create method to return a success message
//     jest.spyOn(prismaService.user, 'create').mockResolvedValueOnce({} as any);

//     // Act
//     const result = await service.signUp(dto);

//     // Assert
//     expect(result).toEqual(`SignUp with ${dto.email}`);
//     expect(prismaService.user.findUnique).toHaveBeenCalledWith({ where: { email: dto.email } });
//     expect(prismaService.user.create).toHaveBeenCalledWith({
//       data: {
//         email: dto.email,
//         hashedPassword: expect.any(String), // Assert that hashedPassword is of type string
//       },
//     });
//   });

//   it('should throw BadRequestException when email already exists', async () => {
//     // Arrange
//     const dto: AuthDto = {
//       email: 'existing@example.com',
//       password: 'secure_password123',
//     };

//     // Mock the PrismaService's findUnique method to return a user, indicating the email already exists
//     jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue({} as any);

//     // Act & Assert
//     await expect(service.signUp(dto)).rejects.toThrowError(BadRequestException);
//     expect(prismaService.user.findUnique).toHaveBeenCalledWith({ where: { email: dto.email } });
//     expect(prismaService.user.create).not.toHaveBeenCalled(); // Assert that create method was not called
//   });
// });
// ----------------------------
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import { AuthDto } from '../dto/auth.dto';
import { BadRequestException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        PrismaService,
        JwtService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should sign up successfully', async () => {
    // Arrange
    const dto: AuthDto = {
      email: 'test@example.com',
      password: 'secure_password123',
    };

    // Mock the PrismaService's findUnique method to return null, indicating the email does not exist
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

    // Mock the PrismaService's create method to return a success message
    jest.spyOn(prismaService.user, 'create').mockResolvedValueOnce({} as any);

    // Act
    const result = await service.signUp(dto);

    // Assert
    expect(result).toEqual(`SignUp with ${dto.email}`);
    expect(prismaService.user.findUnique).toHaveBeenCalledWith({ where: { email: dto.email } });
    expect(prismaService.user.create).toHaveBeenCalledWith({
      data: {
        email: dto.email,
        hashedPassword: expect.any(String), // Assert that hashedPassword is of type string
      },
    });
  });
  it('should throw BadRequestException when email already exists', async () => {
    // Arrange
    const dto: AuthDto = {
      email: 'john_doe@example.com',
      password: 'secure_password123',
    };
    jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue({ 
      id: '1',
      email: 'john_doe@example.com',
      hashedPassword: 'hashed_password',
      createdAt: new Date(),
      updateAt: new Date(),
    });
    
    const spyCreate = jest.spyOn(prismaService.user, 'create'); // Spy on the create method
  
    // Act & Assert
    await expect(service.signUp(dto)).rejects.toThrowError(BadRequestException);
    expect(prismaService.user.findUnique).toHaveBeenCalledWith({ where: { email: dto.email } });
    expect(spyCreate).not.toHaveBeenCalled(); // Assert that create method was not called
  });
  
});

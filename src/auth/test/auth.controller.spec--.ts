import { AuthDto } from './../dto/auth.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { PrismaService } from '../../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt'; // Import JwtService
import { Request, Response } from 'express';


describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService, JwtService], // Include JwtService
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should sign in successfully', async () => {
      // Arrange
      const dto: AuthDto = {
  email: 'john_doe',
  password: 'secure_password123',
};
      const req: Partial<Request> = {}; // Mock request object
      const res: Partial<Response> = { // Mock response object
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    
      const mockResponse: Partial<Response> = { // Mock response object with necessary properties
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      
      jest.spyOn(authService, 'signIn').mockResolvedValue(mockResponse as Response);

    
      // Act
      await controller.signIn(dto, req as Request, res as Response);
    
      // Assert
      expect(res.status).not.toHaveBeenCalled(); // No error status should be set
      expect(res.send).toHaveBeenCalledWith(mockResponse); // Response should be sent with result
    });
    

    it('should handle error when authService throws an error', async () => {
      // Arrange
      const dto: AuthDto = {
  email: 'john_doe',
  password: 'secure_password123',
};
      const req: Partial<Request> = {}; // Mock request object
      const res: Partial<Response> = { // Mock response object
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      jest.spyOn(authService, 'signIn').mockRejectedValue(new Error('Auth service error'));

      // Act
      await controller.signIn(dto, req as Request, res as Response);

      // Assert
      expect(res.status).toHaveBeenCalledWith(400); // Error status should be set
      expect(res.send).toHaveBeenCalledWith('Auth service error'); // Error message should be sent
    });

    it('should handle error when signIn method returns undefined', async () => {
      // Arrange
      const dto: AuthDto = {
  email: 'john_doe',
  password: 'secure_password123',
};
      const req: Partial<Request> = {}; // Mock request object
      const res: Partial<Response> = { // Mock response object
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      jest.spyOn(authService, 'signIn').mockResolvedValue(undefined);

      // Act
      await controller.signIn(dto, req as Request, res as Response);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500); // Internal server error status should be set
      expect(res.send).toHaveBeenCalledWith('Internal Server Error'); // Error message should be sent
    });
  });
});

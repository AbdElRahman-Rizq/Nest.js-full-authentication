import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("signup")
  signup(@Body() dto:AuthDto){
    return this.authService.signUp(dto)
  }
  @Post("signIn")
  async signIn(@Body() dto: AuthDto, @Req() req: Request, @Res() res: Response) { // Define types for req and res
    try {
      // Call the signIn method of the authService
      const result = await this.authService.signIn(dto, req, res);

      // If the signIn method returns a result, send it as a response
      if (result) {
        res.send(result);
      } else {
        // Handle the case when signIn method returns nothing
        res.status(500).send('Internal Server Error');
      }
    } catch (error) {
      // Handle any errors that occur during sign-in
      res.status(400).send(error.message);
    }
  }

  @Get("signOut")
   async signOut(@Req() req:Request,@Res() res:Response){
    const result =await this.authService.signOut(req,res)
    res.send(result);
  }
}

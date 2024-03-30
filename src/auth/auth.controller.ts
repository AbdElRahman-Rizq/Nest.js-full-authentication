import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("signup")
  signup(){
    return this.authService.signUp()
  }
  @Post("signIn")
  signIn(){
    return "signIn"
  }
  @Post("signOut")
  signOut(){
    return "signOut"
  }
}

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Jwt_Secret } from 'src/utils/constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
        jwtFromRequest:ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
        secretOrKey:Jwt_Secret
    });
  }
  private static extractJWT(req:Request):string|null{
    if (req.cookies&&"token" in req.cookies) {
        return req.cookies.token
    }
    return null
  }
  async validate(payload:{id:string,email:string}): Promise<any> {
    return payload
  }
}
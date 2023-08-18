import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

export interface FrontOfficeJwtPayload {
  userId: string;
}

@Injectable()
export class FrontOfficeJwtStrategy extends PassportStrategy(Strategy, 'front-office') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: authService.returnJwtExtractor(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(jwtPayload: FrontOfficeJwtPayload) {
    console.log('Front Office jwtPayload', jwtPayload)
    const user = await this.authService.validateUser(jwtPayload);
    if (!user || !user.admin) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

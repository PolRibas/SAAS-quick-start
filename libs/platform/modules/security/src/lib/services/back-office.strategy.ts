import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

export interface BackOfficeJwtPayload {
  userId: string;
}

@Injectable()
export class BackOfficeJwtStrategy extends PassportStrategy(Strategy, 'back-office') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: authService.returnJwtExtractor(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(jwtPayload: BackOfficeJwtPayload) {
    const user = await this.authService.validateUser(jwtPayload);
    if (!user || !user.admin) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

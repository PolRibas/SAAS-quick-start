import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

export interface FrontOfficeJwtPayload {
  userId: string;
  companyId?: string;
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
    const response = await this.authService.validateCompany(jwtPayload);
    if (!response) {
      throw new UnauthorizedException();
    }
    return response;
  }
}

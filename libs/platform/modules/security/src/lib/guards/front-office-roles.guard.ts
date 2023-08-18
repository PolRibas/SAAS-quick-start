import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class FrontOfficeRolesGuard extends AuthGuard('front-office') {
  private readonly role: string;

  constructor(role: string) {
    super();
    this.role = role;
  }

  handleRequest(err, user) {
    console.log(`need ${this.role} role in FrontOfficeRolesGuard`)
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!user.admin) {
      throw new ForbiddenException('Forbidden');
    }
    return user && user.admin;
  }
}

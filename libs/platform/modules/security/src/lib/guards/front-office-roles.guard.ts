import {
  Injectable,
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

  handleRequest(err, response) {
    if (response?.companyUser) {
      const permissions = response.companyUser.role.permissions
      if (permissions.includes(this.role) ||
        permissions.includes('root-permission')) {
        return {
          ...response.user,
          companyId: response.companyUser.companyId,
          permissions,
        }
      }
    }
    throw new UnauthorizedException()
  }
}

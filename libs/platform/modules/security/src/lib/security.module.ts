import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { refreshTokenSchema, userCompanyRoleSchema, userSchema } from '@saas-quick-start/infrastructure/database/models';
import { AuthService, BackOfficeJwtStrategy, FrontOfficeJwtStrategy, JwtStrategy } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'RefreshToken', schema: refreshTokenSchema },
      { name: 'User', schema: userSchema },
      { name: 'UserCompanyRole', schema: userCompanyRoleSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    BackOfficeJwtStrategy,
    FrontOfficeJwtStrategy
  ],
  exports: [AuthService],
})
export class SecurityModule { }

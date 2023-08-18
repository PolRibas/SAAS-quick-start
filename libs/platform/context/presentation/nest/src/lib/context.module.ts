import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContextController } from './controllers';
import { ContextServices } from './services';
import { userCompanyRoleSchema, userSchema } from '@saas-quick-start/infrastructure/database/models';
import { SecurityModule } from '@saas-quick-start/platform/modules/security';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: userSchema },
      { name: 'UserCompanyRole', schema: userCompanyRoleSchema },
    ]),
    SecurityModule,
  ],
  controllers: [ContextController],
  providers: [ContextServices],
})
export class ContextModule { }

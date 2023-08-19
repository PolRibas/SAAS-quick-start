import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { companyRoleSchema, userCompanyRoleSchema, userSchema } from '@saas-quick-start/infrastructure/database/models';
import { CompanyRoleCrudController, CompanyUserController } from './controllers';
import { CompanyRoleCrudService, CompanyUserCrudService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    MongooseModule.forFeature([{ name: 'CompanyRole', schema: companyRoleSchema }]),
    MongooseModule.forFeature([{ name: 'UserCompanyRole', schema: userCompanyRoleSchema }]),
  ],
  controllers: [CompanyRoleCrudController, CompanyUserController],
  providers: [CompanyRoleCrudService, CompanyUserCrudService],
})
export class FrontOfficeCompanyUsersModule { }

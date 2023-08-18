import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { companySchema, companyPermissionsSchema, userCompanyRoleSchema } from '@saas-quick-start/infrastructure/database/models';
import { FrontOfficeCreateCompanyController } from './create-company.controller';
import { FrontOfficeCreateCompanyServices } from './create-company.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Company', schema: companySchema }]),
    MongooseModule.forFeature([{ name: 'CompanyPermissions', schema: companyPermissionsSchema }]),
    MongooseModule.forFeature([{ name: 'UserCompanyRole', schema: userCompanyRoleSchema }]),
  ],
  controllers: [FrontOfficeCreateCompanyController],
  providers: [FrontOfficeCreateCompanyServices],
})
export class FrontOfficeCreateCompanyModule { }

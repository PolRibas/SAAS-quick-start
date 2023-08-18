import { Model } from 'mongoose';
import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CompanyEntity, CompanyPermissionsList } from '@saas-quick-start/domain/company';
import { CompanyFactory } from '@saas-quick-start/infrastructure/database/adapters';
import { CompanySchemaInterface, CompanyPermissionsSchemaInterface, UserCompanyRoleSchemaInterface } from '@saas-quick-start/infrastructure/database/models';


@Injectable()
export class FrontOfficeCreateCompanyServices {
  constructor(
    @InjectModel('Company')
    private companyModel: Model<CompanySchemaInterface>,
    @InjectModel('CompanyPermissions')
    private companyPermissions: Model<CompanyPermissionsSchemaInterface>,
    @InjectModel('UserCompanyRole')
    private companyUser: Model<UserCompanyRoleSchemaInterface>,
  ) { }

  async createCompany(company: CompanyEntity, userId: string): Promise<{
    company: CompanyEntity;
    role: string;
    permissions: string[];
  }> {
    const findCompany = await this.companyModel.findOne({
      name: company.name,
    });
    if (findCompany) {
      throw new ConflictException('A company with this name already exists.');
    }
    const companyModel = new this.companyModel(company);
    const companyDocument = await companyModel.save();
    let companyPermissionsDocument: CompanyPermissionsSchemaInterface;
    try {
      const companyPermissionsModel = new this.companyPermissions({
        companyId: companyDocument._id,
        name: 'Owner',
        permissions: [
          ...Object.values(CompanyPermissionsList)
        ],
      });
      companyPermissionsDocument = await companyPermissionsModel.save();
      // Create default role for company
    } catch (error) {
      await this.companyModel.deleteOne({ _id: companyDocument._id }).exec()
      throw new InternalServerErrorException();
    }
    try {
      const companyUser = new this.companyUser({
        companyId: companyDocument._id,
        userId,
        role: companyPermissionsDocument._id,
      });
      await companyUser.save();
    } catch (e) {
      await this.companyModel.deleteOne({ _id: companyDocument._id }).exec()
      await this.companyPermissions.deleteOne({ _id: companyPermissionsDocument._id }).exec()
      throw new InternalServerErrorException();
    }

    return {
      company: new CompanyFactory().mongooseToDomain(companyDocument),
      role: companyPermissionsDocument.name,
      permissions: companyPermissionsDocument.permissions,
    };
  }
}

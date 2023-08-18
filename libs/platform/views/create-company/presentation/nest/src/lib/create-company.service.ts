import { Model } from 'mongoose';
import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CompanyEntity, CompanyPermissionsList } from '@saas-quick-start/domain/company';
import { CompanyFactory } from '@saas-quick-start/infrastructure/database/adapters';
import { CompanySchemaInterface, CompanyRoleSchemaInterface, UserCompanyRoleSchemaInterface } from '@saas-quick-start/infrastructure/database/models';


@Injectable()
export class FrontOfficeCreateCompanyServices {
  constructor(
    @InjectModel('Company')
    private companyModel: Model<CompanySchemaInterface>,
    @InjectModel('CompanyRole')
    private companyRole: Model<CompanyRoleSchemaInterface>,
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
    let companyRoleDocument: CompanyRoleSchemaInterface;
    try {
      const companyRoleModel = new this.companyRole({
        companyId: companyDocument._id,
        name: 'Owner',
        permissions: [
          ...Object.values(CompanyPermissionsList)
        ],
      });
      companyRoleDocument = await companyRoleModel.save();
      // Create default role for company
    } catch (error) {
      await this.companyModel.deleteOne({ _id: companyDocument._id }).exec()
      throw new InternalServerErrorException();
    }
    try {
      const companyUser = new this.companyUser({
        companyId: companyDocument._id,
        userId,
        role: companyRoleDocument._id,
      });
      await companyUser.save();
    } catch (e) {
      await this.companyModel.deleteOne({ _id: companyDocument._id }).exec()
      await this.companyRole.deleteOne({ _id: companyRoleDocument._id }).exec()
      throw new InternalServerErrorException();
    }

    return {
      company: new CompanyFactory().mongooseToDomain(companyDocument),
      role: companyRoleDocument.name,
      permissions: companyRoleDocument.permissions,
    };
  }
}

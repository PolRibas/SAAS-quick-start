import { Injectable } from '@nestjs/common';
import { IAbstractMongooseFactory } from '@saas-quick-start/common/abstract/factory';
import { UserEntity } from '@saas-quick-start/domain/user';
import { UserSchemaInterface, UserModel } from '@saas-quick-start/infrastructure/database/models';

@Injectable()
export class UserFactory
  implements IAbstractMongooseFactory<UserEntity, UserSchemaInterface>
{
  domainToMongoose(domainUser: UserEntity): UserSchemaInterface {
    const {
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      createdAt,
      username,
      password,
      updatedAt,
      // companies,
    } = domainUser;
    return new UserModel({
      _id: id,
      firstName,
      lastName,
      email,
      username,
      password,
      phoneNumber,
      createdAt,
      updatedAt,
      // admin: true
    });
  }

  mongooseToDomain(mongooseUser: UserSchemaInterface): UserEntity {
    const {
      _id,
      firstName,
      lastName,
      email,
      username,
      password,
      phoneNumber,
      createdAt,
      updatedAt,
      // companies,
    } = mongooseUser;
    return new UserEntity({
      id: _id,
      email,
      firstName,
      lastName,
      phoneNumber,
      username,
      password,
      createdAt,
      updatedAt,
      // companies: companies.map(companyFactory.toDomain),
    });
  }
}

import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractCrudService } from '@saas-quick-start/common/abstract/service';
import { UserEntity } from '@saas-quick-start/domain/user';
import { UserFactory } from '@saas-quick-start/infrastructure/database/adapters';
import { UserSchemaInterface } from '@saas-quick-start/infrastructure/database/models';
import { Model } from 'mongoose';


@Injectable()
export class UserCrudService extends AbstractCrudService<
  UserEntity,
  UserSchemaInterface
> {
  constructor(
    @InjectModel('User')
    userModel: Model<UserSchemaInterface>,
  ) {
    super(userModel, new UserFactory());
  }

  async create(entity: UserEntity): Promise<UserEntity> {
    throw new ConflictException('Register User for create: ' + entity.email);
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { companySchema, userSchema } from '@saas-quick-start/infrastructure/database/models';
import { CompanyCrudController, UserCrudController } from './controllers';
import { CompanyCrudService, UserCrudService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    MongooseModule.forFeature([{ name: 'Company', schema: companySchema }]),
  ],
  controllers: [CompanyCrudController, UserCrudController],
  providers: [CompanyCrudService, UserCrudService],
})
export class BackOfficeTableModule { }

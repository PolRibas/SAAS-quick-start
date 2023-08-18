import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { companySchema } from '@sports-mind/database/company';
// import { userSchema } from '@sports-mind/database/user';
import { MigrationController } from './migrations.controller';
import { MigrationFunctionsService, migrationSchema } from '@saas-quick-start/infrastructure/migrations';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Migration', schema: migrationSchema },
      // { name: 'User', schema: userSchema },
      // { name: 'Company', schema: companySchema }
    ]),
  ],
  controllers: [MigrationController],
  providers: [MigrationFunctionsService],
})
export class MigrationsModule { }

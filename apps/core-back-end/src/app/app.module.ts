import { Module } from '@nestjs/common';

// Database
import { refreshTokenSchema, userSchema } from '@saas-quick-start/infrastructure/database/models';
import { MongooseModule } from '@nestjs/mongoose';

// Modules
import { HealthModule } from './health';
import { MigrationsModule } from '@saas-quick-start/platform/modules/migrations';
import { ContextModule } from '@saas-quick-start/platform/context/presentation/nest';
import { SecurityModule } from '@saas-quick-start/platform/modules/security';
import { BackOfficeTableModule } from '@saas-quick-start/platform/views/table/presentation/nest';
import { FrontOfficeCreateCompanyModule } from '@saas-quick-start/platform/views/create-company/presentation/nest';
import { FrontOfficeCompanyUsersModule } from '@saas-quick-start/platform/views/settings/company-users/presentation/nest';

const MONGO_URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`;

@Module({
  imports: [
    HealthModule,
    MongooseModule.forRoot(MONGO_URI),
    MongooseModule.forFeature([
      { name: 'RefreshToken', schema: refreshTokenSchema },
      { name: 'User', schema: userSchema },
    ]),

    // Internal Modules
    SecurityModule,
    MigrationsModule,

    // Global
    ContextModule,

    // Back Office
    BackOfficeTableModule,

    // Front Office
    FrontOfficeCreateCompanyModule,
    FrontOfficeCompanyUsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

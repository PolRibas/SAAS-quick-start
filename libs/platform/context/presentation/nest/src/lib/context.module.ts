import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContextController } from './controllers';
import { ContextServices } from './services';
import { userSchema } from '@saas-quick-start/infrastructure/database/models';
import { SecurityModule } from '@saas-quick-start/platform/modules/security';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: userSchema }]),
    SecurityModule,
  ],
  controllers: [ContextController],
  providers: [ContextServices],
})
export class ContextModule { }

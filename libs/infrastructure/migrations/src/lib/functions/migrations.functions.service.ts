import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MigrationSchemaInterface } from '../schema';
import * as migrationsObject from './migrations';
import { MigrationPortOptions } from './migrations-port';
// import { UserSchemaInterface } from '@sports-mind/database/user';
// import { CompanySchemaInterface } from '@sports-mind/database/company';

@Injectable()
export class MigrationFunctionsService {
  private options: MigrationPortOptions;

  constructor(
    @InjectModel('Migration')
    private migrationModel: Model<MigrationSchemaInterface>,
    // @InjectModel('User')
    // private userModel: Model<UserSchemaInterface>,
    // @InjectModel('Company')
    // private companyModel: Model<CompanySchemaInterface>
  ) {
    this.options = {
      migrationModel: this.migrationModel,
      // userModel: this.userModel,
      // companyModel: this.companyModel
    }
  }

  async runMigrations(): Promise<void> {
    console.log('Running migrations...')
    const allMigrationsDone = await this.migrationModel.find();
    await Promise.all(
      Object.keys(migrationsObject.default).map(
        async (migrationId) => {
          if (!allMigrationsDone || !allMigrationsDone.find(migrationDone => migrationDone.name === migrationId)) {

            console.log(`Executing migration ${migrationId}`)

            const MigrationClass = migrationsObject.default[migrationId];
            const migrationInstance = new MigrationClass(this.options);

            let migrationResult = false

            try {
              migrationResult = await migrationInstance.execute()
            } catch (error) {
              console.log(`Error executing migration ${migrationId}`)
              console.log(error)
              throw error
            }

            if (migrationResult) {
              console.log(`Migration ${migrationId} executed correctly`)
              await this.migrationModel.create({ name: migrationId })
            }
          }
        }
      )
    )
  }

  async runMigrationByName(name: string): Promise<void> {
    const MigrationClass = migrationsObject.default[name];
    if (!MigrationClass) throw new Error(`Migration ${name} not found`)

    const existingMigration = await this.migrationModel.findOne({ name });

    if (existingMigration) throw new Error(`Migration ${name} already executed`);

    console.log(`Executing migration ${name}`);

    const migrationInstance = new MigrationClass(this.options);
    let migrationResult = false;

    try {
      migrationResult = await migrationInstance.execute();
    } catch (error) {
      console.log(`Error executing migration ${name}`);
      console.log(error);
    }

    if (migrationResult) {
      console.log(`Migration ${name} executed correctly`)
      await this.migrationModel.create({ name });
    }
  }

  async deleteMigrationByName(name: string): Promise<void> {
    const MigrationClass = migrationsObject.default[name];
    if (!MigrationClass) throw new Error(`Migration ${name} not found`)

    const existingMigration = await this.migrationModel.findOne({ name });

    if (existingMigration) {
      console.log(existingMigration)
      await this.migrationModel.findByIdAndDelete(existingMigration._id);
      console.log('migration deleted')
    }
  }
}

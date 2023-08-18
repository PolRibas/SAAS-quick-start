import { Model } from "mongoose";
import { MigrationSchemaInterface } from "../schema";
// import { UserSchemaInterface } from "@sports-mind/database/user";
// import { CompanySchemaInterface } from '@sports-mind/database/company';


export interface MigrationPortOptions {
  migrationModel: Model<MigrationSchemaInterface>,
  // userModel: Model<UserSchemaInterface>,
  // companyModel: Model<CompanySchemaInterface>,
}

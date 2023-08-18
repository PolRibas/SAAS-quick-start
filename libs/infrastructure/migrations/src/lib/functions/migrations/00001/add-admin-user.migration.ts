import { MigrationPortOptions } from "../../migrations-port";

export class AddAdminUserMigration {
  private static SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL;

  constructor(private options: MigrationPortOptions) { }

  public async execute(): Promise<boolean> {
    if (!AddAdminUserMigration.SUPER_ADMIN_EMAIL) {
      throw new Error('SUPER_ADMIN_EMAIL not defined in .env file');
    }

    // const { userModel } = this.options;
    // const superAdminUser = await userModel.findOne({ email: AddAdminUserMigration.SUPER_ADMIN_EMAIL });
    const superAdminUser = {}
    if (superAdminUser) {
      // const user = await userModel.findByIdAndUpdate(
      //   superAdminUser.id,
      //   {
      //     admin: true,
      // //     roles: ['super-admin'],
      //   },
      //   {
      //     new: true,
      //   }
      // );
      console.log(superAdminUser);

      return true;
    } else {
      throw new Error(`User with email ${AddAdminUserMigration.SUPER_ADMIN_EMAIL} not found`);
    }
  }
}


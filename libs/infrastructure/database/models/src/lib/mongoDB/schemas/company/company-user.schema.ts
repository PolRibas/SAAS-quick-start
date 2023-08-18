import mongoose, { Schema, Document } from 'mongoose';

export interface UserCompanyRoleSchemaInterface extends Document {
  userId: mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;
  role: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export const userCompanyRoleSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId, ref: 'User', required: true
    },
    companyId: {
      type: mongoose.Types.ObjectId, ref: 'Company', required: true
    },
    role: {
      type: mongoose.Types.ObjectId, ref: 'CompanyRole', required: true
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const UserCompanyRoleModel = mongoose.model<UserCompanyRoleSchemaInterface>(
  'UserCompanyRole',
  userCompanyRoleSchema,
);


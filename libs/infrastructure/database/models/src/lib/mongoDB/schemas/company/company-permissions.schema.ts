import mongoose, { Schema, Document } from 'mongoose';

export interface CompanyPermissionsSchemaInterface extends Document {
  companyId: mongoose.Types.ObjectId;
  name: string;
  permissions: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export const companyPermissionsSchema: Schema = new Schema(
  {
    companyId: { type: mongoose.Types.ObjectId, ref: 'Company', required: true },
    name: { type: String, required: true },
    permissions: [{ type: String }],  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const CompanyPermissionsModel = mongoose.model<CompanyPermissionsSchemaInterface>(
  'CompanyPermissions',
  companyPermissionsSchema,
);

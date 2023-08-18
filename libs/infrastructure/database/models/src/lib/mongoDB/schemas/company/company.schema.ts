import mongoose, { Schema, Document } from 'mongoose';

export interface CompanySchemaInterface extends Document {
  name: string;
  address?: string;
  email?: string;
  phoneNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const companySchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    address: String,
    email: String,
    phoneNumber: String,
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const CompanyModel = mongoose.model<CompanySchemaInterface>(
  'Company',
  companySchema,
);

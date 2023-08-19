import mongoose, { Schema, Document } from 'mongoose';

export interface UserSchemaInterface extends Document {
  firstName?: string;
  lastName?: string;
  registerToken?: string;
  email: string;
  phoneNumber?: string;
  admin?: boolean;
  username?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const userSchema: Schema = new Schema(
  {
    firstName: String,
    lastName: String,
    registerToken: String,
    email: { type: String, required: true },
    phoneNumber: String,
    username: String,
    admin: Boolean,
    password: String,
    createdAt: Date,
    updatedAt: Date,
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const UserModel = mongoose.model<UserSchemaInterface>(
  'User',
  userSchema,
);

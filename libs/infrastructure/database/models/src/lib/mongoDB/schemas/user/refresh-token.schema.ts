import mongoose, { Schema, Document } from 'mongoose';
import { UserSchemaInterface } from './user.schema';

export interface RefreshToken extends Document {
  userId: UserSchemaInterface['_id'];
  refreshToken: string;
  ip: string;
  browser: string;
  country: string;
}

export const refreshTokenSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    refreshToken: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    browser: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const RefreshTokenModel = mongoose.model<RefreshToken>(
  'RefreshToken',
  refreshTokenSchema,
);

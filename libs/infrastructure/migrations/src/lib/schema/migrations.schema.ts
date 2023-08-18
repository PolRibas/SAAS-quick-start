import mongoose, { Schema, Document } from 'mongoose';

export interface MigrationSchemaInterface extends Document {
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const migrationSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const MigrationModel = mongoose.model<MigrationSchemaInterface>(
  'Migration',
  migrationSchema,
);

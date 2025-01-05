import { Schema, Document } from 'mongoose';

export const CompanySchema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
});

export interface Company extends Document {
  userId: string;
  name: string;
}

import { Document } from 'mongoose';

export interface Portfolio extends Document {
  readonly name: string;
  readonly operations: string[];
}
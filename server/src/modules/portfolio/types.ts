import { Document } from 'mongoose';

export type Operation = {
  name: string;
  date?: Date;
};

export interface Portfolio extends Document {
  readonly name: string;
  readonly operations: Operation[];
}

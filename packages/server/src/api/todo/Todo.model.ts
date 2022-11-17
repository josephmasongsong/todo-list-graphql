import mongoose, { Document } from 'mongoose';

export interface ITodo extends Document {
  title: string;
  complete: boolean;
}

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
    required: true,
  },
});

export default mongoose.model<ITodo>('Todo', todoSchema);

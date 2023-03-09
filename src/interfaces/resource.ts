import mongoose, { ObjectId } from "mongoose";

export interface IResource extends mongoose.Document {
  name: string;
  price: number;
  userId: ObjectId;
}

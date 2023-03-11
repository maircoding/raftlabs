import { Schema, model } from "mongoose";
import { IResource } from "../interfaces/resource";

const resourceSchema = new Schema<IResource>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Resource = model<IResource>("Resource", resourceSchema);

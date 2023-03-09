import { Schema, model } from "mongoose";
import { IUserDocument } from "../interfaces/user";
import validator from "validator";
import jwt from "jsonwebtoken";

const UserSchema: Schema<IUserDocument> = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    lowecase: true,
    trim: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  age: { type: Number, required: true },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.methods.generateAuthToken = async function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "LOCKED");
  user.tokens = user.tokens.concat({ token });

  await user.save();
  return token;
};

export const User = model<IUserDocument>("User", UserSchema);

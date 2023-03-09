import { Request } from "express";

export interface IRequest extends Request {
  token: any;
  user: any;
}

export interface IUser {
  name: string;
  age: number;
  email: string;
  tokens: [
    {
      token: string;
    }
  ];
}

export interface IUserDocument extends IUser, Document {
  generateAuthToken(): string;
}

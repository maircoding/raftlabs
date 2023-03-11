import { Response } from "express";
import jwt from "jsonwebtoken";
import { IRequest } from "../interfaces/user";
import { User } from "../models/user";

export const auth = async (req: IRequest, res: Response, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "LOCKED");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error('No User Found');
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "User Not Found" });
  }
};

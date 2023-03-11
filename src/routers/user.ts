import express, { Router, Request, Response } from "express";
import { User } from "../models/user";
import { auth } from "../middleware/auth";
import { IRequest } from "../interfaces/user";

const router: Router = express.Router();
export const userRouter = router;

// Create New User
router.post("/user", async (req: Request, res: Response) => {
  const user = new User(req.body);

  try {
    const token = await user.generateAuthToken();
    await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

// Login User
router.post("/user/login", async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send("No User Found");
  }
});

// Check for current user
router.get("/users/me", auth, async (req: IRequest, res: Response) => {
  res.send(req.user);
});

// Logout User
router.post("/users/logout", auth, async (req: IRequest, res: Response) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();
    res.send({ user: req.user.name, status: "Logged Out" });
  } catch (e) {
    res.status(500).send();
  }
});

// Delete User
router.delete("/user/:id", async (req: Request, res: Response) => {
  const userId = req.params.id
  
  try {
    console.log(userId);
    const user = await User.findByIdAndRemove({ _id: userId });
    if (!user) throw Error('User Not Found')
    res.status(204).send({ user });
  } catch (Error) {
    res.status(404).send({Error:'User Not Found'});
  }
});

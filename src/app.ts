import express, { Application } from "express";
import { userRouter } from "./routers/user";
import "./db/db";

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

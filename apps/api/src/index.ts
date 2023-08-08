import "reflect-metadata";
import express, { Request, Response } from "express";
import { UserRouter } from "./routes";
import startDBConnection from "./db";

const app = express();
app.use(express.json());

app.use("/", (req: Request, res: Response) => {
  res.send("Docker is aware of changes");
});

app.use("/users", UserRouter);

startDBConnection();

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});

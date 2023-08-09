import "reflect-metadata";
import express, { Request, Response } from "express";
import { AuthRouter, UserRouter } from "./routes";
import startDBConnection from "./db";
import config from "./config/config";

const app = express();
const PORT = config.port;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("changes");
});

app.use("/users", UserRouter);
app.use("/auth", AuthRouter);

startDBConnection();

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});

import "reflect-metadata";
import express, { Request, Response } from "express";
import { AuthRouter, UserRouter } from "./routes";
import startDBConnection from "./db";
import config from "./config/config";
import handleNotFound from "./middlewares/notFound";
import handleErrors from "./middlewares/handleErrors";
import handleJWT from "./middlewares/handleJWT";

const app = express();
const PORT = config.port;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("changes");
});

app.use("/users", UserRouter);
app.use("/auth", AuthRouter);
app.use(handleNotFound);
// app.use(handleErrors);

startDBConnection();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running in port ${PORT}`);
});

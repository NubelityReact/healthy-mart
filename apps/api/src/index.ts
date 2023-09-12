// @ts-nocheck

import "reflect-metadata";
import express from "express";
// import cors from 'cors';
import "./config/cloudinary";
import "./utils/auth";
import startDBConnection from "./config/db";
import {
  AuthRouter,
  CategoryRouter,
  ProductRouter,
  UserRouter,
} from "./routes";
import config from "./config/config";
import handleNotFound from "./middlewares/notFound";
import handleErrors from "./middlewares/handleErrors";
import session from "express-session";
import passport from "passport";

const PORT = config.port;
const app = express();

//middleware to get the body parsed as json
app.use(express.json());
app.use(
  session({
    secret: config.session_secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());
// app.use(cors)

// Routes
app.get("/", (req, res) => {
  console.log("req.user");
  console.log(req.user);
  res.send("Hello World");
});
app.use("/users", UserRouter);
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
app.use("/categories", CategoryRouter);
app.use(handleNotFound);
app.use(handleErrors);

startDBConnection();

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});

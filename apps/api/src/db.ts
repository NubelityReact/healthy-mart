//@ts-nocheck
import mongoose from "mongoose";
import config from "./config/config";

async function startDBConnection() {
  await mongoose.connect(config.dbUrl);
}

export default startDBConnection;

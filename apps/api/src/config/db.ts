import mongoose from "mongoose";
import config from "./config";

async function startDBConnection() {
  const db = await mongoose.connect(config.dbUrl);
}

export default startDBConnection;

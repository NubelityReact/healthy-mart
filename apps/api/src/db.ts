//@ts-nocheck
import mongoose from "mongoose";

async function startDBConnection() {
  await mongoose.connect("mongodb://db:27017/ecommerce");
}

export default startDBConnection;

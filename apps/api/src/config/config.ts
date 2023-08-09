import dotenv from "dotenv";
import nPath from "path";

const path = nPath.resolve(__dirname, "../../.env.local");
dotenv.config({ path });

const config = {
  isDev: process.env.NODE_ENV || "development",
  jwt_secret: process.env.JWT_SECRET as string,
  dbUrl: process.env.DB_URL || "mongodb://db:27017/ecommerce",
  port: process.env.PORT || 5000,
};

export default config;

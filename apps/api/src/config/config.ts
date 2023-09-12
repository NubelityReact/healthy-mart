import dotenv from "dotenv";
import path from "path";

const envFile = path.resolve(__dirname, "../../.env.local");
console.log({ envFile });
dotenv.config({ path: envFile });

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  dbUrl: process.env.DB_URL || "mongodb://db:27017/ecommerce",
  access_token: process.env.ACCESS_TOKEN as string,
  refresh_token: process.env.REFRESH_TOKEN as string,
  recovery_token: process.env.RECOVERY_TOKEN as string,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY as string,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET as string,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  smtp_user: process.env.SMTP_USER as string,
  smtp_pass: process.env.SMTP_PASS as string,
  email_from: process.env.EMAIL_FROM as string,
  google_client_id: process.env.GOOGLE_CLIENT_ID as string,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
  session_secret: process.env.SESSION_SECRET as string,
};

export default config;

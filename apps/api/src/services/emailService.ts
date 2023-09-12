import nodemailer from "nodemailer";
import config from "../config/config";

export const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: config.smtp_user,
      pass: config.smtp_pass,
    },
    secure: false,
  });

  const info = await transporter.sendMail({
    from: {
      name: "Healthy-mart",
      address: config.email_from,
    },
    to,
    subject,
    html,
  });
  console.log("Message sent: %s", info.messageId);
};

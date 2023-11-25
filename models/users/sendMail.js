import "dotenv/config";
import nodemailer from "nodemailer";

export const sendEmail = async (email, verificationToken) => {
  console.log("verificationToken", verificationToken);
  const config = {
    host: "smtp.office365.com",
    port: 587,
    auth: {
      user: process.env.OUTLOOK_EMAIL,
      pass: process.env.OUTLOOK_PASSWORD,
    },
  };
  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: "prishchepovee558@outlook.com",
    to: email,
    subject: "Confirm your email, please",
    html: `<a href="http://localhost:3000/users/verify/${verificationToken}">Click here to verify your email </a>`,
  };
  try {
    await transporter.sendMail(emailOptions);
    console.log("Email sent");
  } catch (err) {
    console.log(err);
  }
};

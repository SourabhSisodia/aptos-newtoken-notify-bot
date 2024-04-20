import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_APP_PASS,
  },
});

export const sendMail = async () => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: {
      name: "ss",
      address: process.env.EMAIL,
    }, // sender address
    to: process.env.EMAIL_RECEIVER, // list of receivers
    subject: "New Token Trending On Aptos", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
};

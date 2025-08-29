import nodemailer from "nodemailer";
import "dotenv/config";

const mailSender = async (email, subject, body) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"BookWorm" <${process.env.EMAIL_USER}`,
      to: `${email}`,
      subject: `${subject}`,
      html: `${body}`,
    });

    console.log("Email Sent Sucessfully");
    console.log(info);
  } catch (error) {
    console.log("Email Sent Failed");
    console.log(error.message);
  }
};

export default mailSender;

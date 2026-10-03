import nodemailer from "nodemailer";
import "dotenv/config";

const mailSender = async (email, subject, body) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn("Email credentials are not configured; skipping welcome email.");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"BookWorm" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html: body,
    });

    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Welcome email failed:", error.message);
  }
};

export default mailSender;
import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB Connection Established Successfully");
  } catch (error) {
    console.error("Error connecting to DB : ", error.message);
    process.exit(1);
  }
};

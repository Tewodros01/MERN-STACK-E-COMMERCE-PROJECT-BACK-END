import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGO_DB!);
    console.log("Db is connected");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;

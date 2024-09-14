import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME, MONGO_URI } from "../../Constant.js";
dotenv.config();

const connectToDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_LINK }`
    );
    console.log(`Connection Instance: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

export default connectToDB 
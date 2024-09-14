import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./src/Routes/user.routes.js";
import connectToDB from "./src/Db/Db.js";
import cors from "cors";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors(
  {
    origin: "*",
  }
));
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/users", userRouter); // http://localhost:3000/api/users

connectToDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => {
    console.log("Error: ", error.message);
  });

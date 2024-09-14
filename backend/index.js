import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./src/Routes/user.routes.js";
import productRouter from "./src/Routes/products.routes.js";
import connectToDB from "./src/Db/Db.js";
import cors from "cors";
import orderRouter from "./src/Routes/order.routes.js";

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
app.use("/api/products", productRouter); // http://localhost:3000/api/products
app.use("/api/orders", orderRouter); // http://localhost:3000/api/orders


connectToDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch((error) => {
    console.log("Error: ", error.message);
  });

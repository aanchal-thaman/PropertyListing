import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import loginRoute from "./routes/login.js";
import signupRoute from "./routes/signup.js";
import usersRoute from "./routes/user.js";
import propertyRoute from "./routes/property.js";
import listpropertyRoute from "./routes/list-property.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use("/api/login", loginRoute);
app.use("/api/signup", signupRoute);
app.use("/api/users", usersRoute);
app.use("/api/property", propertyRoute);
app.use("/api/list-property", listpropertyRoute);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("Connected to backend.");
});
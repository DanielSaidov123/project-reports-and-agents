import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToMongoDB } from "./db/mongoDB.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import auth from "./routes/auth.route.js";
import users from "./routes/users.route.js";
import report from "./routes/report.route.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use(express.json());

app.use(cookieParser());

app.use(fileUpload());

app.use("/uploads", express.static("uploads"));

app.get("/api", (req, res) => {
  res.status(200).json("Welcome to the Agent Reporting System");
});

app.use("/api/auth", auth);
app.use("/api/report", report);
app.use("/api/users", users);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`server is running on port ${PORT}`);
});

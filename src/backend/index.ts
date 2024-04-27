const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
import authRoutes from "./routes/auth";
import commentsRoutes from "./routes/comments";
import filtersRoutes from "./routes/filters";
import usersRoutes from "./routes/user";
import videosRoutes from "./routes/videos";
import { seeder } from "./seeder/seeder";
dotenv.config();
//use this to seed data
// seeder()

const app = express();

// Convert incoming request to json, and make it available in req.body
app.use(express.json());

// Allows requests from anywhere
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

// It parse incoming cookie data from HTTP request and make it accessable in cookies
app.use(cookieParser());

// connection to mongodb
mongoose.connect(process.env.MONGODB_URI);

app.use("/api/auth", authRoutes);
app.use("/api/filters", filtersRoutes);
app.use("/api/videos", videosRoutes);
app.use("/api/user", usersRoutes);
app.use("/api/comment",commentsRoutes)

// Running server on particular port
app.listen(process.env.APP_PORT, () => {
  console.log(`SERVER STARTED ON PORT ${process.env.APP_PORT}`);
});

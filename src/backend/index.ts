const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const Filter = require("./models/filter");
import authRoutes from "./routes/auth";
import filtersRoutes from './routes/filters'
import { seeder } from "./seeder/seeder";
dotenv.config();
// seeder()

const app = express();

// Convert incoming request to json, and make it available in req.body
app.use(express.json());

// Allows requests from anywhere
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// It parse incoming cookie data from HTTP request and make it accessable in req.cookies
app.use(cookieParser());

// connection to mongodb
mongoose.connect(process.env.MONGODB_URI);

app.use("/api/auth", authRoutes);
app.use("/api/filters",filtersRoutes);

// Running server on particular port
app.listen(process.env.APP_PORT, () => {
  console.log(`SERVER STARTED ON PORT ${process.env.APP_PORT}`);
});

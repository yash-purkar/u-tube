import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
import commentsRoutes from "./routes/comments";
import filtersRoutes from "./routes/filters";
import playlistRoutes from "./routes/playlist";
import usersRoutes from "./routes/user";
import videosRoutes from "./routes/videos";
import { seeder } from "./seeder/seeder";

const app = express();

// Middleware: Parse incoming JSON data
app.use(express.json());

dotenv.config();

// Middleware: Allow requests from specified origin
app.use(
  cors({
    origin: ["http://localhost:3000", "https://u-tubev2.vercel.app"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

// Middleware: Parse incoming cookie data
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.ATLAS_URI as string);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/filters", filtersRoutes);
app.use("/api/videos", videosRoutes);
app.use("/api/user", usersRoutes);
app.use("/api/comment", commentsRoutes);
app.use("/api/playlist", playlistRoutes);

// Start server
app.listen(process.env.APP_PORT, () => {
  console.log(`SERVER STARTED ON PORT ${process.env.APP_PORT}`);
});

export default app;

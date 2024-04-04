import express from "express";
import { getAllVideos } from "../controllers/videos";
const router = express.Router();

// all videos route
router.get("/all_videos", getAllVideos);

export default router;
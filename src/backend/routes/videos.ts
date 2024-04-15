import express from "express";
import { getAllVideos, getVideoDetails } from "../controllers/videos";
import { VideoDetailsRequest } from "../types";
const router = express.Router();

// all videos route
router.get("/all_videos", getAllVideos);

// Video details route
router.get("/watch", async (req, res) => {
  await getVideoDetails(req as VideoDetailsRequest, res);
});

export default router;

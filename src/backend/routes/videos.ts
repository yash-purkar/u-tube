import express from "express";
import {
  dislikeVideo,
  getAllVideos,
  getVideoDetails,
  likeVideo,
  usersLikedVideos,
  videosByUserId,
} from "../controllers/videos";
import {
  DislikeVideoRequest,
  LikeVideoRequest,
  VideoDetailsRequest,
} from "../types";
import { checkAuth } from "../middlewares/middlewares";
const router = express.Router();

// all videos route
router.get("/all_videos", getAllVideos);

// Video details route
router.get("/watch", async (req, res) => {
  await getVideoDetails(req as VideoDetailsRequest, res);
});

// like video
router.post("/like", checkAuth, async (req, res) => {
  await likeVideo(req as LikeVideoRequest, res);
});

// dislike video
router.post("/dislike", checkAuth, async (req, res) => {
  await dislikeVideo(req as DislikeVideoRequest, res);
});
export default router;

// Videos by user id
router.get("/videos_by_user", async (req, res) => {
  await videosByUserId(req, res);
});

// It handles users liked videos
router.get("/liked_videos", async (req, res) => {
  await usersLikedVideos(req, res);
});
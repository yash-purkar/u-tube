import express from "express";
import {
  addUserSearchHistory,
  addVideoToWatchLater,
  clearUsersWatchHistory,
  getUserById,
  handleSubscribeAndUnSubscribe,
  removeUserSearchHistory,
  usersWatchHistory,
} from "../controllers/user";
import {
  AddUserSearchHistoryRequest,
  SubscribeAndUnsubscribeVideoRequest,
  UserSearchHistoryRemoveRequest,
} from "../types";
import { checkAuth } from "../middlewares/middlewares";
const router = express.Router();

// It handles user search history
router.post(
  "/search_history",
  async (req, res) =>
    await addUserSearchHistory(req as AddUserSearchHistoryRequest, res)
);

// It deletes user search history one by one
router.delete(
  "/search_history",
  async (req, res) =>
    await removeUserSearchHistory(req as UserSearchHistoryRemoveRequest, res)
);

// Subscribe to channel
router.post("/subscribe_or_unsubscribe", checkAuth, async (req, res) => {
  await handleSubscribeAndUnSubscribe(
    req as SubscribeAndUnsubscribeVideoRequest,
    res
  );
});

// User by username
router.get("/user_by_id/:username", async (req, res) => {
  await getUserById(req, res);
});

// Add video to watch later
router.post("/watch_later", checkAuth, async (req, res) => {
  await addVideoToWatchLater(req, res);
});

// Get user's watch history
router.get("/history", checkAuth, async (req, res) => {
  await usersWatchHistory(req, res);
});

router.delete(
  "/clear_watch_history",
  async (req, res) => await clearUsersWatchHistory(req, res)
);
export default router;

import express from "express";
import {
  addUserSearchHistory,
  getUserById,
  handleSubscribeAndUnSubscribe,
  removeUserSearchHistory,
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

export default router;

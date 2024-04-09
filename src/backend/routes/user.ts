import express from "express";
import {
  addUserSearchHistory,
  removeUserSearchHistory,
} from "../controllers/user";
import {
  AddUserSearchHistoryRequest,
  UserSearchHistoryRemoveRequest,
} from "../types";
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

export default router;

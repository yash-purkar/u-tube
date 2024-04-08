import express from "express";
import { addUserSearchHistory } from "../controllers/user";
import { AddUserSearchHistory } from "../types";
const router = express.Router();

router.post("/search_history", async (req, res) =>
  addUserSearchHistory(req as AddUserSearchHistory, res)
);

export default router;

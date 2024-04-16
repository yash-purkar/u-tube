import express from "express";
import { addComment } from "../controllers/comments";
import { AddCommentRequest } from "../types";
import { checkAuth } from "../middlewares/middlewares";

const router = express.Router();

// Add new comment
router.post("/add_comment", checkAuth, async (req, res) => {
  await addComment(req as AddCommentRequest, res);
});

export default router;

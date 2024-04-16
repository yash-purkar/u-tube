import express from "express";
import { addComment } from "../controllers/comments";
import { AddCommentRequest } from "../types";

const router = express.Router();

// Add new comment
router.post("/add_comment", async (req, res) => {
  await addComment(req as AddCommentRequest, res);
});

export default router;

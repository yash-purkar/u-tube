import express from "express";
import { addComment, deleteComment } from "../controllers/comments";
import { AddCommentRequest, DeleteCommentRequest } from "../types";
import { checkAuth } from "../middlewares/middlewares";

const router = express.Router();

// Add new comment
router.post("/add_comment", checkAuth, async (req, res) => {
  await addComment(req as AddCommentRequest, res);
});

// Delete comment
router.delete("/delete_comment",checkAuth,async(req,res) => {
  await deleteComment(req as DeleteCommentRequest,res)
})
export default router;

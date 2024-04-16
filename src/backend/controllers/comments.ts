import { Response } from "express";
import { AddCommentRequest, DeleteCommentRequest } from "../types";
const Comment = require("../models/comment");
const User = require("../models/user");

// It adds new comment
export const addComment = async (req: AddCommentRequest, res: Response) => {
  try {
    const body = req.body;
    const { video, content, user } = body;

    const newComment = new Comment({
      user,
      video,
      content,
    });

    await newComment.save();

    // sending updated comments
    const comments = await Comment.find({ video })
      .sort({ _id: -1 })
      .populate("user");

    return res
      .status(200)
      .send({ Success: true, message: "Comment Added Successfully", comments });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
/*
We have created seperate collection for comments, and we are storing all comments there with userId and video, and while fetching the videoDetails we are sending the comments of that video.
*/

// It deletes the comment

export const deleteComment = async (
  req: DeleteCommentRequest,
  res: Response
) => {
  try {
    const comment_id = req.query.comment_id;

    const deletedComment = await Comment.findByIdAndDelete(comment_id)
      .sort({ _id: -1 })
      .populate("user");

    const comments = await Comment.find({ video: deletedComment?.video });

    return res.status(200).send({
      Success: true,
      message: "Comment Deleted Succesfully",
      comments,
    });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

import { Response } from "express";
import { AddCommentRequest } from "../types";
const Comment = require("../models/comment");

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
    const comments = await Comment.find({ video });

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
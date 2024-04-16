import { Response } from "express";
import {
  AddCommentRequest,
  DeleteCommentRequest,
  DislikeCommentRequest,
  LikeCommentRequest,
} from "../types";
import mongoose from "mongoose";
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
    return res
      .status(500)
      .send({ Success: false, message: "Internal Server Error" });
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
    return res
      .status(500)
      .send({ Success: false, message: "Internal Server Error" });
  }
};

// It likes the comment
export const likeComment = async (req: LikeCommentRequest, res: Response) => {
  try {
    const body = req.body;

    // Finding the comment
    const comment = await Comment.findById(body?.comment_id);

    // if comment is there add like in it
    if (comment) {
      // If comment is already liked, remove the like
      if (comment?.likes?.includes(body?.user_id)) {
        const filteredComments = comment?.likes?.filter(
          (userId: mongoose.Types.ObjectId) => !userId?.equals(body?.user_id)
        );

        comment.likes = filteredComments;
      } else {
        // else add the like
        comment.likes = [...comment.likes, body?.user_id];

        //And remove from the dislikes if it is there
        if (comment?.dislikes?.includes(body?.user_id)) {
          const filteredComments = comment?.dislikes?.filter(
            (userId: mongoose.Types.ObjectId) => !userId?.equals(body?.user_id)
          );
          comment.dislikes = filteredComments;
        }
      }

      // save comment
      await comment.save();

      // get comments again to send updated comments
      const comments = await Comment.find({ video: body.video_id })
        .sort({ _id: -1 })
        .populate("user");

      return res.status(200).send({ Success: true, comments });
    }

    return res
      .status(404)
      .send({ Success: false, message: "Comment not found" });
  } catch (error) {
    return res
      .status(500)
      .send({ Success: false, message: "Internal Server Error" });
  }
};

// Dislike comment
export const dislikeComment = async (
  req: DislikeCommentRequest,
  res: Response
) => {
  try {
    const body = req.body;

    // finding the comment
    const comment = await Comment.findById(body?.comment_id);

    // If comment is there
    if (comment) {
      // If already dislike remove from dislike
      if (comment?.dislikes?.includes(body?.user_id)) {
        const filteredComments = comment?.dislike?.filter(
          (userId: mongoose.Types.ObjectId) => !userId.equals(body?.user_id)
        );

        comment.dislikes = filteredComments;
      } else {
        // else add it in dislikes
        comment.dislikes = [...comment.dislikes, body?.user_id];

        //And remove from the likes if there
        if (comment?.likes?.includes(body?.user_id)) {
          const filteredComments = comment.likes.filter(
            (userId: mongoose.Types.ObjectId) => !userId.equals(body?.user_id)
          );
          comment.likes = filteredComments;
        }
      }

      await comment.save();

      const comments = await Comment.find({ video: body.video_id })
        .sort({ _id: -1 })
        .populate("user");

      return res.status(200).send({ Success: true, comments });
    }

    return res
      .status(404)
      .send({ Success: false, message: "Comment not found" });
  } catch (error) {
    return res
      .status(500)
      .send({ Success: false, message: "Internal Server Error" });
  }
};

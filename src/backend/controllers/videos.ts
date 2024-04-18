import { Request, Response } from "express";
import {
  DislikeVideoRequest,
  LikeVideoRequest,
  VideoDetailsRequest,
} from "../types";
import mongoose from "mongoose";

const Video = require("../models/video");
const Comment = require("../models/comment");

export const getAllVideos = async (req: Request, res: Response) => {
  try {
    // getting filtername from query to return the filtered data
    const filterInQuery = req.query?.filter;
    // This will find the filter in title and in the description
    const filter =
      filterInQuery === "All"
        ? {}
        : {
            $or: [
              {
                title: {
                  $regex: filterInQuery,
                  $options: "i", // insensitive
                },
              },
              {
                description: {
                  $regex: filterInQuery,
                  $options: "i", // insensitive
                },
              },
            ],
          };
    // We've to use regex to find it in title, so it will search in title is filterQuery present in that, if we don't use regex it will try to finx exact match to the query, means title should be same as queryFilter. And same with description. We've used $or so it will return the video if at title or description any one contains the filterQuery
    const videos = await Video.find({ ...filter }).populate("user");
    return res.status(200).send({ Success: true, videos });
  } catch (err) {
    return res
      .status(500)
      .send({ Success: false, message: "Internal Server Error" });
  }
};

// Get single video details
export const getVideoDetails = async (
  req: VideoDetailsRequest,
  res: Response
) => {
  try {
    const query = req.query;

    // finding video
    const video = await Video.findById(query?.vid_id).populate({
      path: "user",
      select: "username firstName lastName subscribers",
    });

    // exclude _id and select subscribers and username

    const videoComments = await Comment.find({ video: video?._id })
      .sort({ _id: -1 })
      .populate("user");

    if (video)
      return res
        .status(200)
        .send({ Success: true, video, comments: videoComments });

    return res.status(404).send({ Success: false, message: "Video not found" });
  } catch (error) {
    res.status(500).send({ Success: false, message: "Internal Server Error" });
  }
};
/*
We have created seperate collection for comments, and we are storing all comments there with userId and video, and while fetching the videoDetails we are sending the comments of that video.
*/

// It handles like video
export const likeVideo = async (req: LikeVideoRequest, res: Response) => {
  try {
    const body = req.body;

    // Finding video
    const video = await Video.findById(body?.video_id).populate({
      path: "user",
      select: "-_id subscribers firstName lastName username",
    });
    // Populate user and exclude _id and include subscribers

    if (video) {
      // If video is already liked
      if (video?.likes?.includes(body?.user_id)) {
        const filteredVideoLikes = video?.likes?.filter(
          (userId: mongoose.Types.ObjectId) => !userId.equals(body?.user_id)
        );

        video.likes = filteredVideoLikes;
      } else {
        video.likes = [...video.likes, body?.user_id];

        // If video is disliked remove that dislike
        if (video?.dislikes?.includes(body?.user_id)) {
          const filteredVideoDislikes = video?.dislikes?.filter(
            (userId: mongoose.Types.ObjectId) => !userId.equals(body?.user_id)
          );

          video.dislikes = filteredVideoDislikes;
        }
      }

      await video.save();

      return res.status(200).send({ Success: true, video });
    } else {
      return res
        .status(404)
        .send({ Success: false, message: "Video not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ Success: false, message: "Internal Server Error" });
  }
};

// It handles dislike video
export const dislikeVideo = async (req: DislikeVideoRequest, res: Response) => {
  try {
    const body = req.body;

    const video = await Video.findById(body?.video_id).populate({
      path: "user",
      select: "-_id subscribers firstName lastName username",
    });
    // Populate user and exclude _id and include subscribers

    if (video) {
      //If already dislike remove dislike
      if (video?.dislikes?.includes(body?.user_id)) {
        const filteredDislikes = video?.dislikes?.filter(
          (userId: mongoose.Types.ObjectId) => !userId.equals(body?.user_id)
        );

        video.dislikes = filteredDislikes;
      } else {
        // else add dislike
        video.dislikes = [...video?.dislikes, body?.user_id];

        // And remove it from like
        const filteredVideoLikes = video?.likes?.filter(
          (userId: mongoose.Types.ObjectId) => !userId.equals(body?.user_id)
        );

        video.likes = filteredVideoLikes;
      }

      await video.save();

      return res.status(200).send({ Success: true, video });
    } else {
      return res
        .status(404)
        .send({ Success: false, message: "Video not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ Success: false, message: "Internal Server Error" });
  }
};

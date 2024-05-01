import { Request, Response } from "express";
import {
  DislikeVideoRequest,
  LikeVideoRequest,
  VideoDetailsRequest,
} from "../types";
import mongoose from "mongoose";

const Video = require("../models/video");
const Comment = require("../models/comment");
const User = require("../models/user");

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

// Videos by user id
export const videosByUserId = async (req: Request, res: any) => {
  try {
    const { limit, currentPage, user_id } = req.query;

    const userVideos = await Video.find({ user: user_id });

    // start from here
    const start = Number(currentPage) * Number(limit) - Number(limit);

    // goes upto
    const end = Number(currentPage) * Number(limit);

    const videosToSend = userVideos?.slice(start, end);

    return res.status(200).send({
      Success: true,
      videos: videosToSend,
      totalVideos: userVideos?.length,
    });
  } catch (err) {
    return res
      .status(500)
      .send({ Success: false, message: "Internal Server Error" });
  }
};

// It returns logged users liked videos;
export const usersLikedVideos = async (req: Request, res: Response) => {
  try {
    // getting user to find details
    const user = await User.findOne({ username: req.query.username }).select(
      "liked_videos"
    );
    if (!user) {
      return res
        .status(404)
        .send({ Success: false, message: "User not found" });
    }

    const allVideos = await Video.find().populate("user");

    // Getting all liked videos of user from videos collection
    const usersLikedVideos = allVideos.filter((vid: any) => {
      return vid.likes.some((user_id: mongoose.Types.ObjectId) =>
        user_id.equals(user._id)
      );
    });

    return res
      .status(200)
      .send({ Success: true, likedVideos: usersLikedVideos });
  } catch (error) {
    console.log(error);
  }
};

// It returns user's watchlater videos

export const usersWatchLaterVideos = async (req: Request, res: Response) => {
  try {
    // user id from query
    const username = req.query.username;
    // Finding user to get watch later videos id
    const user = await User.findOne({ username: username }).select("+watch_later_videos");

    if (user) {
      // All videos, we'll find watch later videos in this.
      const allVideos = await Video.find().populate("user");
console.log("U",user)
      // user's watch later videos
      const watchLaterVideos = allVideos?.filter((vid: any) =>
        user?.watch_later_videos?.includes(vid?._id)
      );

      return res.status(200).send({ Success: true, watchLaterVideos });
    } else {
      return res
        .status(404)
        .send({ Success: false, message: "User not found" });
    }
  } catch (error) {}
};

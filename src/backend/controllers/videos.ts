import { Request, Response } from "express";
import { VideoDetailsRequest } from "../types";

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

    const video = await Video.findById(query?.vid_id).populate("user");

    const videoComments = await Comment.find({ video: video?._id }).populate(
      "user"
    );

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

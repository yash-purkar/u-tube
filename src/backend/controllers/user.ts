import mongoose from "mongoose";
import {
  AddUserSearchHistoryRequest,
  SubscribeAndUnsubscribeVideoRequest,
  UserSearchHistoryRemoveRequest,
} from "../types";
import { Request, Response } from "express";
const User = require("../models/user");
const Video = require("../models/video");

// It handles user search history after clicking on suggestion
export const addUserSearchHistory = async (
  req: AddUserSearchHistoryRequest,
  res: Response
) => {
  try {
    const data = req.body;

    //searching user
    const user = await User.findById(data?.user_id).select("search_history");

    // adding new video id in search history
    user.search_history = [...user.search_history, data?.video_id];

    // saving user
    await user.save();

    return res.status(200).send({
      Success: true,
      message: "Search history added",
      history: user?.search_history,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ Success: false, message: "Internal Server Error" });
  }
};

// It removes the user search history
export const removeUserSearchHistory = async (
  req: UserSearchHistoryRemoveRequest,
  res: Response
) => {
  try {
    const urlQuery = req.query;

    // Finding the user
    const user = await User.findById(urlQuery?.user_id).select(
      "search_history"
    );

    // Removing requested history from user_history array
    const updated_history_arr = user?.search_history?.filter(
      (history_vid_id: mongoose.Types.ObjectId) =>
        !history_vid_id?.equals(urlQuery?.video_id as string)
    );

    // updating in user
    user.search_history = updated_history_arr;
    await user.save();

    return res.status(200).send({
      Success: true,
      message: "Item removed from search history",
      history: user?.search_history,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ Success: false, message: "Internal Server Error" });
  }
};

// Subscribe yt channel
export const handleSubscribeAndUnSubscribe = async (
  req: SubscribeAndUnsubscribeVideoRequest,
  res: Response
) => {
  try {
    const body = req.body;

    // searching user to subscribe
    const subscribe_to_this_user = await User.findOne({
      username: body?.subscribe_to,
    }).select("subscribers");
    // If user is there
    if (subscribe_to_this_user) {
      // If already subscribe then unsubscribe
      if (subscribe_to_this_user?.subscribers?.includes(body?.subscriber)) {
        const filteredSubscribers = subscribe_to_this_user?.subscribers?.filter(
          (username: string) => username !== body?.subscriber
        );

        subscribe_to_this_user.subscribers = filteredSubscribers;
      } else {
        // else add it in subscribers
        subscribe_to_this_user.subscribers = [
          ...subscribe_to_this_user.subscribers,
          body?.subscriber,
        ];
      }

      await subscribe_to_this_user.save();

      // We need to send the video back to the to show updated details
      const video = await Video.findById(body?.video_id).populate({
        path: "user",
        select: "firstName lastName subscribers",
      });

      return res.status(200).send({ Success: true, video });
    } else {
      return res
        .status(404)
        .send({ Success: false, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ Success: false, message: "Internal Server Error" });
  }
};

// User by id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const params = req.params;

    const user = await User.findOne({ username: params?.username }).select(
      "subscribers firstName lastName username"
    );

    if (user) {
      return res.status(200).send({ Success: true, user });
    } else {
      return res
        .status(404)
        .send({ Success: false, message: "User not found." });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ Success: false, message: "Internal server error" });
  }
};

// It adds video to watch later
export const addVideoToWatchLater = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const user = await User.findById(body?.user_id).select(
      "+watch_later_videos"
    );

    if (user) {
      // If already in watch later remove it
      if (user?.watch_later_videos?.includes(body?.video_id)) {
        const updated_watch_later_videos = user?.watch_later_videos?.filter(
          (vidId: mongoose.Types.ObjectId) => !vidId.equals(body?.video_id)
        );

        user.watch_later_videos = updated_watch_later_videos;
        await user.save();
        return res.status(200).send({
          Success: true,
          message: "Removed from watch later",
          watch_later_videos: user?.watch_later_videos,
        });
      } else {
        // else add it
        user.watch_later_videos = [...user.watch_later_videos, body?.video_id];
        await user.save();
        return res.status(200).send({
          Success: true,
          message: "Added to watch later",
          watch_later_videos: user?.watch_later_videos,
        });
      }
    } else {
      return res
        .status(404)
        .send({ Success: false, message: "User not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ Status: false, message: "Internal Server Error" });
  }
};

// We've added user's history in video details controller
// It returns user's watch history
export const usersWatchHistory = async (req: Request, res: Response) => {
  try {
    const username = req.query.username;
    console.log(username);
    const user = await User.findOne({ username: username }).select("history");
    console.log(user);
    // Getting all videos, we'll find history videos in this
    const allVideos = await Video.find().populate({
      path: "user",
      select: "-_id",
    });

    const historyVideos = allVideos.filter((vid: any) =>
      user?.history?.includes(vid?._id)
    );

    return res.status(200).send({ Success: true, history: historyVideos });
  } catch (error) {
    return res
      .status(500)
      .send({ Success: false, message: "Internal Server Error" });
  }
};

// It clears user's watch history

export const clearUsersWatchHistory = async (req: Request, res: Response) => {
  try {
    const username = req.query.username;

    const user = await User.findOne({ username: username });

    user.history = [];

    await user.save();

    return res.status(200).send({ Success: true, message: "History Cleared" });
  } catch (error) {
    return res
      .status(500)
      .send({ SuccesS: false, message: "Internal Server Error" });
  }
};

// Create playlist
// export

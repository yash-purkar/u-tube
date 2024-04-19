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
    const user = await User.findById(data?.user_id);

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
    const user = await User.findById(urlQuery?.user_id);

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
    console.log(subscribe_to_this_user);
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

    const user = await User.findOne({username:params?.username}).select("subscribers firstName lastName username");

    if(user) {
     return res.status(200).send({Success:true,user});
    } else {
      return res.status(404).send({Success:false,message:"User not found."})
    }
  } catch (error) {
    return res.status(500).send({Success:false, message:"Internal server error"})
  }
};

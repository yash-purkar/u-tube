import mongoose from "mongoose";
import {
  AddUserSearchHistoryRequest,
  UserSearchHistoryRemoveRequest,
} from "../types";
import { Response } from "express";
const User = require("../models/user");

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

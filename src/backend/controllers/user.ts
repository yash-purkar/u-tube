import { AddUserSearchHistory } from "../types";
import { Response } from "express";
const User = require("../models/user");

export const addUserSearchHistory = async (
  req: AddUserSearchHistory,
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

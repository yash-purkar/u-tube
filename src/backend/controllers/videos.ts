import { Request, Response } from "express";

const Video = require("../models/video");

export const getAllVideos = async (req: Request, res: Response) => {
  try {
    const videos = await Video.find().populate("user");
    return res.status(200).send({ Success: true, videos });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ Success: false, message: "Internal Server Error" });
  }
};

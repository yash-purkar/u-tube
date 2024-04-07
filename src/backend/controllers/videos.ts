import { Request, Response } from "express";

const Video = require("../models/video");

export const getAllVideos = async (req: Request, res: Response) => {
  try {
    // getting filtername from query to return the filtered data
    const filterInQuery = req.query?.filter;
    // This will find the filter in title and in the description
    const filter =
      filterInQuery === "All"
        ? {}
        : {
            title: {
              $regex: filterInQuery,
              $options: "i", // insensitive
            },
          };
    // We've to use regex to find it in title, so it will search in title is filterQuery present in that, if we don't use regex it will try to finx exact match to the query, means title should be same as queryFilter.
    const videos = await Video.find({ ...filter }).populate("user");
    return res.status(200).send({ Success: true, videos });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ Success: false, message: "Internal Server Error" });
  }
};

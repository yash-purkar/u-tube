import { Request, Response } from "express";
import mongoose, { Types } from "mongoose";
const Playlist = require("../models/playlist");

// Create playlist
export const createPlaylist = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (!body?.name || !body?.user) {
      return res
        .status(499)
        .send({ Success: false, message: "All fields are required" });
    }

    // Getting user's all playlist to check is plalist name already used
    const usersPlaylist = await Playlist.find({ user: body?.user }).select(
      "user"
    );

    // checking is playlist name already used
    const isPlaylistNameAlreadyUsed = usersPlaylist?.some(
      (playlist: { name: string }) => playlist?.name === body?.name
    );

    if (isPlaylistNameAlreadyUsed) {
      return res
        .status(409)
        .send({ Success: false, message: "Playlist Name Already used" });
    }

    const newPlaylist = new Playlist({ ...body });

    await newPlaylist.save();

    return res.status(200).send({ Success: true, message: "Playlist Added" });
  } catch (error) {
    return res
      .status(200)
      .send({ Success: false, message: "Internal Server Error", error });
  }
};

// It delete playlist
export const deletePlaylist = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const deletedPlaylist = await Playlist.findByIdAndDelete(body?.playlist_id);

    if (deletedPlaylist) {
      return res
        .status(200)
        .send({ Success: true, message: "Playlist Deleted" });
    } else {
      return res
        .status(404)
        .send({ Success: false, message: "Playlist not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ SuccesS: false, message: "Internal Server Error" });
  }
};

// Get all playlists of user
export const getAllPlaylistsOfUser = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    // Getting all playlists to find
    const usersPlaylists = await Playlist.find({ user: body?.user });

    return res.status(200).send({ Success: true, playlists: usersPlaylists });
  } catch (error) {
    return res
      .status(500)
      .send({ Success: false, message: "Internal Server Error" });
  }
};

// Add video to playlist
export const addVideoToPlaylist = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    // Finding playlist to add video
    const playlist = await Playlist.findById(body?.playlist);

    // updating playlist
    const updatedPlaylistVideos = [...playlist.videos, body?.video];

    playlist.videos = updatedPlaylistVideos;

    await playlist.save();

    return res
      .status(200)
      .send({ Success: true, message: "Video Added to playlist" });
  } catch (error) {}
};

// remove video from playlist
export const removeVideoFromPlaylist = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    // Finding playlist
    const playlist = await Playlist.findById(body?.playlist).select("videos");

    // removing video from playlist
    const updatedVideosInPlaylist = playlist.videos?.filter(
      (vid: Types.ObjectId) => !vid.equals(body.video)
    );

    // saving playlist
    await playlist.save();

    return res
      .status(200)
      .send({ Success: true, message: "Video Removed From Playlist" });
  } catch (error) {
    return res
      .status(500)
      .send({ Success: false, message: "Internal Server Error"});
  }
};

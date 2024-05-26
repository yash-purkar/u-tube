import { Router } from "express";
import {
  addVideoToPlaylist,
  createPlaylist,
  deletePlaylist,
  getAllPlaylistsOfUser,
  getPlaylistById,
  removeVideoFromPlaylist,
} from "../controllers/playlist";

const router = Router();

// Create playlist
router.post("/create", async (req, res) => {
  await createPlaylist(req, res);
});

// Delete playlist
router.delete("/delete", async (req, res) => {
  await deletePlaylist(req, res);
});

// get all playlists of user
router.post("/playlists", async (req, res) => {
  await getAllPlaylistsOfUser(req, res);
});

// Add video in playlist
router.post("/add_video", async (req, res) => {
  await addVideoToPlaylist(req, res);
});

// Remove video from playlist
router.delete("/remove_video", async (req, res) => {
  await removeVideoFromPlaylist(req, res);
});

// get playlist by id
router.get("/playlist", async (req, res) => {
  await getPlaylistById(req, res);
});
export default router;

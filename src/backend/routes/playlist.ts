import { Router } from "express";
import {
  addVideoToPlaylist,
  createPlaylist,
  deletePlaylist,
  getAllPlaylistsOfUser,
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
router.get("/playlists", async (req, res) => {
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
export default router;

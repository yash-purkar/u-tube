import mongoose, { Document, Schema, Types, model, models } from "mongoose";

interface PlaylistSchema extends Document {
  name: string;
  user: Types.ObjectId;
  videos: Types.ObjectId[];
}

const playlistSchema = new Schema<PlaylistSchema>({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  videos: {
    type: [{type: Schema.Types.ObjectId, ref: "Video"}],
    ref: "Video",
    required: true,
  },
});

const PlaylistModel = models.Playlist || model("Playlist", playlistSchema);
module.exports = PlaylistModel;

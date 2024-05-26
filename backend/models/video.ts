import { Schema, Document, Types, models, model } from "mongoose";

interface VideoSchema extends Document {
  user: Types.ObjectId;
  title: string;
  description: string;
  thumbnail_url: string;
  embeded_url: string;
  views: number;
  category: string;
  yt_url: string;
  likes: Types.ObjectId[];
  dislikes: Types.ObjectId[];
}

const videoSchema = new Schema<VideoSchema>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail_url: {
      type: String,
      required: true,
    },
    embeded_url: {
      type: String,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
    },
    likes: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: "User",
    },
    dislikes: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: "User",
    },
    yt_url: String,
  },
  { timestamps: true }
);

const VideoModel = models.Video || model("Video", videoSchema);
module.exports = VideoModel;

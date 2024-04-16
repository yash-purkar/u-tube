import { Schema, models, model, Document, Types } from "mongoose";

interface CommentModel extends Document {
  user: Types.ObjectId;
  video: Types.ObjectId;
  content: string;
  likes: Types.ObjectId[];
  dislikes: Types.ObjectId[];
  is_deleted_by_creator: boolean;
}

const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
      required: true,
    },
    content: {
      type: String,
      required: true,
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
    is_deleted_by_creator: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const CommentModel = models.Comment || model("Comment", commentSchema);
module.exports = CommentModel;

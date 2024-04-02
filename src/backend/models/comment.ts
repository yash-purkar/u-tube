import { Schema, models, model, Document, Types } from "mongoose";

interface CommentModel extends Document {
  user: Types.ObjectId;
  content: string;
  likes: number;
  dislikes: number;
  is_deleted_by_creator: boolean;
}

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  is_deleted_by_creator: {
    type: Boolean,
    default: false,
  },
});

const CommentModel = models.Comment || model("Comment", commentSchema);
module.exports = CommentModel;

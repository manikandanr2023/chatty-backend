import { ICommentDocument } from "@comment/interfaces/comment.interface";
import mongoose, { model, Model, Schema } from "mongoose";

const commentSchema: Schema = new Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", index: true },
  comment: { type: String, default: "" },
  username: { type: String },
  avatarColor: { type: String },
  profilePicture: { type: String },
  createdAt: { type: Date, default: Date.now() }
});

const CommentsModel: Model<ICommentDocument> = model<ICommentDocument>("Comment", commentSchema, "Comment");
export { CommentsModel };

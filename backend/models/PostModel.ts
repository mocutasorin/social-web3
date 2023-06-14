import mongoose, { Schema } from "mongoose";

type TPost = {
  user: Schema.Types.ObjectId;
  content: string;
  image: string;
  likes: Schema.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};

type TComment = {
  user: Schema.Types.ObjectId;
  content: String;
};

const CommentSchema: Schema<TComment> = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PostSchema: Schema<TPost> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;

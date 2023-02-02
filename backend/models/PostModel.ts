import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    image: {
        type: String,
        required: true
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });
  
const PostModel = mongoose.model('Post', PostSchema);

export default PostModel;
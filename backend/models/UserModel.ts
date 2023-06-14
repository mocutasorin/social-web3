import mongoose, { Schema, Types } from "mongoose";

type TUser = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  profilePicture: string;
  birth_date: Date;
  gender: string;
  walletAddress: string;
  friends: Types.ObjectId[];
  friendRequests: Types.ObjectId[];
  createdAt: Date;
};

const UserSchema: Schema<TUser> = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    last_name: {
      type: String,
      required: true,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    birth_date: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: false,
    },
    walletAddress: {
      type: String,
      required: false,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    friendRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;

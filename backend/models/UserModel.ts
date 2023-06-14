import mongoose, { Document, Model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
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
  comparePasswords(password: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema(
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

UserSchema.methods.comparePasswords = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const UserModel: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default UserModel;

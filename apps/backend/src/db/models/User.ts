import mongoose, { Document, Schema, Model } from "mongoose";

export interface UserType {
  name: string;
  email: string;
  provider: string;
  avatar: string;
  verified: boolean;
}

interface UserDocument extends UserType, Document {}

const UserSchema: Schema<UserDocument> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    provider: {
      type: String,
      default: "google",
    },
    avatar: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel: Model<UserDocument> = mongoose.model<UserDocument>(
  "User",
  UserSchema
);

export default UserModel;

import mongoose, { Document, Schema, Model } from "mongoose";

export interface BloomType {
  userId: typeof Schema.Types.ObjectId;
  name: string;
  dailytimeGoal: number;
  preferredTime: number;
  numberOfSessions: number;
}

interface BloomDocument extends BloomType, Document {}

const BloomSchema: Schema<BloomDocument> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dailytimeGoal: {
      type: Number,
      required: true,
    },
    preferredTime: {
      type: Number,
    },
    numberOfSessions: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

BloomSchema.index({ name: 1, userId: 1 });

const BloomModel: Model<BloomDocument> = mongoose.model<BloomDocument>(
  "Bloom",
  BloomSchema
);

export default BloomModel;

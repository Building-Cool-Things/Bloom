import mongoose, { Document, Schema, Model } from "mongoose";

export interface BloomType {
  userId: typeof Schema.Types.ObjectId;
  name: string;
  dailytimeGoal: number;
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
      type: Number, // Time in minutes to be spent each day
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BloomModel: Model<BloomDocument> = mongoose.model<BloomDocument>(
  "Bloom",
  BloomSchema
);

export default BloomModel;

import mongoose, { Document, Schema, Model } from "mongoose";

export interface BloomProgressType {
  userId: typeof Schema.Types.ObjectId;
  bloomId: typeof Schema.Types.ObjectId;
  date: Date;
  sessions: {
    timeSpent: number;
    loggedAt: Date;
  }[];
}

interface BloomProgressDocument extends BloomProgressType, Document {}

const BloomProgressSchema: Schema<BloomProgressDocument> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bloomId: {
      type: Schema.Types.ObjectId,
      ref: "Bloom",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    sessions: [
      {
        timeSpent: {
          type: Number,
          required: true,
        },
        loggedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient querying by user, bloom task, and date
BloomProgressSchema.index({ userId: 1, bloomId: 1, date: 1 }, { unique: true });

const BloomProgressModel: Model<BloomProgressDocument> =
  mongoose.model<BloomProgressDocument>("BloomProgress", BloomProgressSchema);

export default BloomProgressModel;

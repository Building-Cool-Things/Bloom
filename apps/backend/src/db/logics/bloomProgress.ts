import mongoose from "mongoose";
import currentDate from "../../utils/currentDate";
import showError from "../../utils/showError";
import BloomProgressModel, { sessionType } from "../models/BloomProgress";

class BloomProgress {
  async createBloomProgress(userId: string, bloomId: string) {
    try {
      const bloomProgress = new BloomProgressModel({
        userId,
        bloomId,
        date: new Date(),
      });
      const savedBloomProgress = await bloomProgress.save();
      return savedBloomProgress;
    } catch (error) {
      showError(error);
    }
  }

  async getAllBloomProgress(userId: string) {
    try {
      const bloomProgresses = await BloomProgressModel.find({
        userId,
      });

      return bloomProgresses;
    } catch (error) {
      showError(error);
    }
  }

  async getBloomProgress(userId: string, bloomId: string) {
    try {
      const bloomProgress = await BloomProgressModel.findOne({
        userId,
        bloomId,
      });

      return bloomProgress;
    } catch (error) {
      showError(error);
    }
  }

  async checkBloomCreate(userId: string, bloomId: string) {
    try {
      const { startOfDay, endOfDay } = currentDate();
      const bloomProgress = await BloomProgressModel.findOne({
        userId,
        bloomId,
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });
      return bloomProgress;
    } catch (error) {
      showError(error);
    }
  }

  async addSession(userId: string, bloomId: string, newSession: sessionType) {
    try {
      const { startOfDay, endOfDay } = currentDate();
      const progress = await BloomProgressModel.findOneAndUpdate(
        {
          userId,
          bloomId,
          date: { $gte: startOfDay, $lte: endOfDay },
        },
        {
          $push: { sessions: newSession },
        },
        {
          new: true, // Return the updated document
          upsert: true, // Create a new document if none exists
        }
      );
      return progress;
    } catch (error) {
      showError(error);
    }
  }

  async getSessionCount(userId: string, progressId: string) {
    console.log(userId, progressId);
    try {
      const sessionCount = await BloomProgressModel.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(progressId),
            userId: userId,
          },
        },
        {
          $project: {
            totalSessions: { $size: "$sessions" }, // Count the number of sessions
          },
        },
      ]);

      if (sessionCount && sessionCount.length > 0) {
        return sessionCount[0]?.totalSessions;
      } else {
        return 0;
      }
    } catch (error) {
      showError(error);
    }
  }
}

export default BloomProgress;

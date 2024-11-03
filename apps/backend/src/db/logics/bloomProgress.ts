import showError from "../../utils/showError";
import BloomProgressModel from "../models/BloomProgress";

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
      const startOfDay = new Date();
      // Set to start of the day in UTC
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date();
      // Set to end of the day in UTC
      endOfDay.setUTCHours(23, 59, 59, 999);

      const bloomProgress = await BloomProgressModel.findOne({
        userId,
        bloomId,
        date: {
          $gte: startOfDay,
          $lte: endOfDay,
        },
      });
      console.log("check", bloomProgress);
      return bloomProgress;
    } catch (error) {
      showError(error);
    }
  }
}

export default BloomProgress;

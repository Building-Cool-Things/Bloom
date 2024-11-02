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
        bloomId
      });

      return bloomProgress;
    } catch (error) {
      showError(error);
    }
  }

  async checkBloomCreate(userId:string,bloomId:string){
    try {
        const bloomProgress = await BloomProgressModel.findOne({
          userId,
          bloomId
        //   date:
        });
  
        return bloomProgress;
      } catch (error) {
        showError(error);
      }
  }
}

export default BloomProgress;

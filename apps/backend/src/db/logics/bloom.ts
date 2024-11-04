import showError from "../../utils/showError";
import BloomModel, { BloomType } from "../models/Bloom";

class Bloom {
  async createBloom(data: BloomType) {
    try {
      const bloom = new BloomModel(data);
      const savedBloom = await bloom.save();
      return savedBloom;
    } catch (error) {
      showError(error);
    }
  }

  async getAllBlooms(userId: string) {
    try {
      const blooms = await BloomModel.find({
        userId,
      });

      return blooms;
    } catch (error) {
      showError(error);
    }
  }

  async getBloom(userId: string, id: string) {
    try {
      const bloom = await BloomModel.findOne({
        userId,
        _id: id,
      });

      return bloom;
    } catch (error) {
      showError(error);
    }
  }

  async getpreferredBloomSession(userId: string, id: string) {
    try {
      const sessionCount = await BloomModel.findOne(
        {
          userId,
          _id: id,
        },
        {
          numberOfSessions: true,
        }
      );
      return sessionCount;
    } catch (error) {
      showError(error);
    }
  }
}

export default Bloom;

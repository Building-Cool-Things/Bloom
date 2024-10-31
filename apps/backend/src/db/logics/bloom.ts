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
      const bloom = await BloomModel.find({
        userId,
      });

      return bloom;
    } catch (error) {
      showError(error);
    }
  }
}

export default Bloom;

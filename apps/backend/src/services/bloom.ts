import Bloom from "../db/logics/bloom";
import { BloomType } from "../db/models/Bloom";
import showError from "../utils/showError";

class BloomService {
  private Bloom: Bloom;
  constructor() {
    this.Bloom = new Bloom();
  }

  async createBloom(data: BloomType) {
    try {
      const bloom = await this.Bloom.createBloom(data);
      return bloom;
    } catch (err) {
      showError(err);
    }
  }

  async getAllBloom(userId: string) {
    try {
      const blooms = await this.Bloom.getAllBlooms(userId);
      return blooms;
    } catch (err) {
      showError(err);
    }
  }

  async getBloomById(userId: string, id: string) {
    try {
      const bloom = await this.Bloom.getBloom(userId, id);
      return bloom;
    } catch (err) {
      showError(err);
    }
  }
}

export default BloomService;

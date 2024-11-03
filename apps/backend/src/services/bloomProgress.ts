import BloomProgress from "../db/logics/bloomProgress";
import { BloomProgressType, sessionType } from "../db/models/BloomProgress";
import showError from "../utils/showError";

class BloomProgressService {
  private BloomProgress: BloomProgress;
  constructor() {
    this.BloomProgress = new BloomProgress();
  }

  async createBloomProgress(userId: string, bloomId: string) {
    try {
      const checkBloomProgress = await this.BloomProgress.checkBloomCreate(
        userId,
        bloomId
      );

      if (checkBloomProgress) {
        return checkBloomProgress;
      } else {
        const createBloom = await this.BloomProgress.createBloomProgress(
          userId,
          bloomId
        );

        if (createBloom) return createBloom;
      }
    } catch (err) {
      showError(err);
    }
  }

  async createProgress(userId: string, bloomId: string, session: sessionType) {
    try {
      const progress = await this.BloomProgress.addSession(
        userId,
        bloomId,
        session
      );
      if (progress) return progress;
    } catch (err) {
      showError(err);
    }
  }
}

export default BloomProgressService;

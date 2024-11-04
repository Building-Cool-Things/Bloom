import Bloom from "../db/logics/bloom";
import BloomProgress from "../db/logics/bloomProgress";
import { BloomProgressType, sessionType } from "../db/models/BloomProgress";
import showError from "../utils/showError";

class BloomProgressService {
  private BloomProgress: BloomProgress;
  private Bloom: Bloom;
  constructor() {
    this.BloomProgress = new BloomProgress();
    this.Bloom = new Bloom();
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

  async getCompletedSessions(
    userId: string,
    progressId: string,
    bloomId: string
  ) {
    try {
      const sessionCompleted = await this.BloomProgress.getSessionCount(
        userId,
        progressId
      );
      const prefferedSessions = await this.Bloom.getpreferredBloomSession(
        userId,
        bloomId
      );
      let leftSessions = 0;
      if (prefferedSessions) {
        if (prefferedSessions.numberOfSessions > sessionCompleted) {
          leftSessions = prefferedSessions.numberOfSessions - sessionCompleted;
        }
      }

      return {
        prefferedSessions: prefferedSessions?.numberOfSessions,
        sessionCompleted,
        leftSessions,
      };
    } catch (err) {
      showError(err);
    }
  }
}

export default BloomProgressService;

import { Router, Request, Response } from "express";
import isAuthenticated from "../helpers/isAuthenticated";
import { validateData } from "../helpers/validationMiddleware";
import { bloomData } from "./validation/bloom";
import { ExtendedUserType } from "../types";
import showError from "../utils/showError";
import BloomProgressService from "../services/bloomProgress";

const router = Router();
const BloomProgress = new BloomProgressService();
router.post(
  "/create/:bloomId",
  isAuthenticated,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const userId = (req.user as ExtendedUserType)?._id;
      const bloomId = req.params.bloomId;
      const savedBloomProgress = await BloomProgress.createBloomProgress(
        userId,
        bloomId
      );
      if (savedBloomProgress) {
        res.json({
          success: true,
          savedBloomProgress,
        });
      } else {
        res.json({
          success: false,
        });
      }
    } catch (err) {
      showError(err);
    }
  }
);

router.post(
  "/session/:bloomId",
  isAuthenticated,
  async (req: Request, res: Response): Promise<any> => {
    try {
      const userId = (req.user as ExtendedUserType)?._id;
      const bloomId = req.params.bloomId;
      const sessions = req.body;
      const addSession = await BloomProgress.createProgress(
        userId,
        bloomId,
        sessions
      );
      if (addSession) {
        res.json({
          success: true,
          addSession,
        });
      } else {
        res.json({
          success: false,
        });
      }
    } catch (err) {
      showError(err);
    }
  }
);

export default router;

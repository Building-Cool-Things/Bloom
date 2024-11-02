import { Router, Request, Response } from "express";

import isAuthenticated from "../helpers/isAuthenticated";
import { validateData } from "../helpers/validationMiddleware";
import { bloomData } from "./validation/bloom";
import { ExtendedUserType } from "../types";
import BloomService from "../services/bloom";
import showError from "../utils/showError";

const router = Router();
const Bloom = new BloomService();
router.post(
  "/create",
  isAuthenticated,
  validateData(bloomData),
  async (req: Request, res: Response): Promise<any> => {
    try {
      const data = req.body;

      const bloom = {
        userId: (req.user as ExtendedUserType)?._id,
        ...data,
      };

      const savedBloom = await Bloom.createBloom(bloom);
      if (savedBloom) {
        res.json({
          success: true,
          savedBloom,
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

router.get("/all", isAuthenticated, async (req, res) => {
  try {
    const userId = (req.user as ExtendedUserType)?._id;
    const bloom = await Bloom.getAllBloom(userId);
    if (bloom) {
      res.json({
        success: true,
        bloom,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (err) {
    showError(err);
  }
});

router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const userId = (req.user as ExtendedUserType)?._id;
    const id = req.params.id;
    const bloom = await Bloom.getBloomById(userId,id);
    if (bloom) {
      res.json({
        success: true,
        bloom,
      });
    } else {
      res.json({
        success: false,
      });
    }
  } catch (err) {
    showError(err);
  }
});

export default router;

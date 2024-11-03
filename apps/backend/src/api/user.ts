import express, { Router, Request, Response, RequestHandler } from "express";
import passport from "passport";
import isAuthenticated from "../helpers/isAuthenticated";
import showError from "../utils/showError";

const router = Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/callback/google",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/check",
    failureRedirect: "http://localhost:5173/sign-in",
  })
);

router.get("/check", isAuthenticated, (req: Request, res: Response): any => {
  try {
    if (req.user) {
      return res.json({
        success: true,
        user: req.user,
      });
    } else {
      return res.json({
        success: false,
      });
    }
  } catch (err) {
    showError(err);
  }
});

router.post("/logout", (req, res) => {
  try {
    req.logout(() => {
      req.session.destroy(() => {
        return res.json({
          success: true,
        });
      });
    });
  } catch (err) {
    showError(err);
  }
});

export default router;

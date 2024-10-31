import express, { Router, Request, Response, RequestHandler } from "express";
import passport from "passport";
import isAuthenticated from "../helpers/isAuthenticated";

const router = Router();

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/callback/google",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173",
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
    console.log(err);
  }
});

router.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      return;
    });
  });
});

export default router;

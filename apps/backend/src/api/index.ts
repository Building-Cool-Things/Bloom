import express from "express";
import user from "./user";
import bloom from "./bloom";
import bloomProgress from "./bloomProgress";

const router = express.Router();

router.use("/user", user);
router.use("/bloom", bloom);
router.use("/bloom-progress", bloomProgress);

export default router;

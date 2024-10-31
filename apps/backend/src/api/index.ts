import express from "express";
import user from "./user";
import blomm from "./bloom";

const router = express.Router();

router.use("/user", user);
router.use("/bloom", blomm);

export default router;

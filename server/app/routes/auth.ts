import { Router } from "express";
import passport from "passport";
import { signin, signup } from "../controllers/authController.ts";

const requireLogin = passport.authenticate("local", { session: false });

const router = Router();

router.post("/", signup);
router.post("/signin", requireLogin, signin);

export default router;

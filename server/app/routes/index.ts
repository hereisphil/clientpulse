import express, { type Request, type Response } from "express";
import authRoutes from "./auth.ts";
import clientRoutes from "./clientRoutes.ts";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: `${req.method} - Request made`,
  });
});

router.use("/client", clientRoutes);
router.use("/auth", authRoutes);

export default router;

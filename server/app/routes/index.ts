import express, { type Request, type Response } from "express";
import clientRoutes from "./clientRoutes.js";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: `${req.method} - Request made`,
  });
});

router.use("/client", clientRoutes);

export default router;

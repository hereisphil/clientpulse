import type { Request, Response } from "express";
import express from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: `${req.method} - Request made`,
  });
});

export default router;

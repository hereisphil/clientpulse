import { Router } from "express";
import { createClient } from "../controller/clientController.js";
const router = Router();

router.post("/", createClient);

export default router;

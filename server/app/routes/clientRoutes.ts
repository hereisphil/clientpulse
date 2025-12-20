import { Router } from "express";
import {
  createClient,
  deleteClient,
  getAllClients,
  getClientById,
  updateClient,
} from "../controllers/clientController.ts";
import { requireAuth } from "../middleware/requireAuth.ts";
const router = Router();

// All client routes are now protected via middleware
router.post("/", requireAuth, createClient);
router.get("/", requireAuth, getAllClients);
router.get("/:id", requireAuth, getClientById);
router.put("/:id", requireAuth, updateClient);
router.delete("/:id", requireAuth, deleteClient);

export default router;

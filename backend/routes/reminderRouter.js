import express from "express";
import {
  getAllReminders,
  createReminder,
  updateReminder,
  deleteReminder
} from "../controllers/reminderController.js";
import { authenticate } from "../middleware/jwt.js";  // call authentication middleware


// Router for reminder endpoints
const router = express.Router();

// Routes for reminders 
router.get("/", authenticate, getAllReminders);
router.post("/", authenticate, createReminder);
router.put("/:id", authenticate, updateReminder);
router.delete("/:id", authenticate, deleteReminder);

export default router;

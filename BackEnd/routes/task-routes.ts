// routes/task-routes.ts
import express from "express";
import {
  getTasksByUserId,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task-controllers";
import checkAuth from "../middlewares/check-auth";

const router = express.Router();

router.use(checkAuth); // Protect all task routes

router.get("/getTasks", getTasksByUserId);
router.post("/addTask", createTask);
router.patch("/update/:tid", updateTask);
router.delete("/delete/:tid", deleteTask);

export default router;

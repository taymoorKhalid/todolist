import { Request, Response, NextFunction } from "express";
import HttpError from "../models/http-error";
import Task from "../models/task";

const getTasksByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.userId; // Extracted from JWT

  try {
    const tasks = await Task.find({ userId });
    res.json({
      allTasks: tasks.map((task) => task.toObject({ getters: true })),
    });
  } catch {
    return next(new HttpError("Fetching tasks failed.", 500));
  }
};

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const { text, isCompleted } = req.body;
  const userId = req.userId;

  const newTask = new Task({
    userId, // Store the user ID associated with the task
    text,
    isCompleted, // Default state
  });

  try {
    await newTask.save();
    res.status(201).json({
      message: "Task created Successfully!",
      task: newTask.toObject({ getters: true }),
    });
  } catch {
    return next(new HttpError("Creating task failed!", 500));
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const { tid } = req.params;

  try {
    const task = await Task.findByIdAndDelete(tid);

    if (!task) {
      return next(new HttpError("Task not found.", 404));
    }

    res.json({
      message: "Task deleted",
    });
  } catch {
    return next(new HttpError("Deleting task failed.", 500));
  }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  const { tid } = req.params;
  const { text } = req.body;

  try {
    // Prepare the data to be updated
    const updateData: { text?: string; isCompleted?: boolean } = {};
    if (text) {
      updateData.text = text;
    } else {
      const task = await Task.findById(tid);
      if (!task) {
        return next(new HttpError("Task not found.", 404));
      }
      updateData.isCompleted = !task.isCompleted;
    }

    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(tid, updateData, {
      new: true,
    });

    if (!updatedTask) {
      return next(new HttpError("Task not found.", 404));
    }

    res.json({
      message: "Task updated successfully.",
    });
  } catch (err) {
    return next(new HttpError("Updating task failed.", 500));
  }
};

export { getTasksByUserId, createTask, updateTask, deleteTask };

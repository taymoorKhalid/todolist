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
    await Task.findByIdAndDelete(tid);

    // Fetch remaining tasks for the user
    const remainingTasks = await Task.find({ userId: req.userId }); // Filter by userId as needed
    res.json({
      message: "Task deleted",
      tasks: remainingTasks.map((task) => task.toObject({ getters: true })),
    });
  } catch {
    return next(new HttpError("Deleting task failed.", 500));
  }
};

const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  const { tid } = req.params; // Task ID from params
  const { text } = req.body; // Text to update, but `isCompleted` will be toggled automatically if not provided

  try {
    const updateData: { text?: string; isCompleted?: boolean } = {};

    // If 'text' is provided, update the task text
    if (text) {
      updateData.text = text;
    }

    // If 'text' is not provided, toggle the 'isCompleted' state
    if (!text) {
      const task = await Task.findById(tid);
      if (!task) {
        return next(new HttpError("Task not found.", 404));
      }

      // Toggle the current completion state of the task
      updateData.isCompleted = !task.isCompleted;
    }

    // Update the task with new data
    const updatedTask = await Task.findByIdAndUpdate(tid, updateData, {
      new: true,
    });

    // If no task found, throw an error
    if (!updatedTask) {
      return next(new HttpError("Task not found.", 404));
    }

    // Fetch all tasks for the user (after the update)
    const allTasks = await Task.find({ userId: req.userId });

    // Send back the updated list of tasks
    res.json({
      message: "Task updated successfully.",
      tasks: allTasks.map((task) => task.toObject({ getters: true })),
    });
  } catch (err) {
    return next(new HttpError("Updating task failed.", 500));
  }
};

export { getTasksByUserId, createTask, updateTask, deleteTask };

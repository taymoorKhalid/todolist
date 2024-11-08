import express, { NextFunction, Request, Response } from "express";
import HttpError from "./models/http-error";
import userRouter from "./routes/user-routes";
import taskRouter from "./routes/task-routes";
import connectDb from "./config/db";
import cors from "cors";

const bodyParser = require("body-parser");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
  })
);

app.use(bodyParser.json());

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log("Request not found.");
  return next(new HttpError("Could not find this route.", 404));
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

connectDb();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

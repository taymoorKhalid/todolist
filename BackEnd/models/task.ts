import mongoose from "mongoose";
import user from "./user";

const Schema = mongoose.Schema;

const task = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: user, required: true },
  text: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
});

export default mongoose.model("Task", task);

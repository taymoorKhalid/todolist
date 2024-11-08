import mongoose from "mongoose";

const Schema = mongoose.Schema;

const user = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true, unique: true },
});

export default mongoose.model("User", user);

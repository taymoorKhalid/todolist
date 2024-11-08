import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://taymoorkhalid:4dAFz58G0jmPkX3C@clustertodo.tla6i.mongodb.net/Todo"
    );
    console.log("Database connected");
  } catch (err) {
    console.log("Failed to connect to DB: ", err);
  }
};

export default connectDb;

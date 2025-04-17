import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/guessing-game");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error!", err);
    console.error("Please start MongoDB before running the server!");
    process.exit(1);
  }
}

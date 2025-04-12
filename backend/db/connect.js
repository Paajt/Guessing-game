import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/guessing-game");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error!", err);
    process.exit(1);
  }
}

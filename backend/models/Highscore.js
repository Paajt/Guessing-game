import mongoose from "mongoose";

const highscoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  attempts: { type: Number, required: true },
  time: { type: Number, required: true },
  targetWord: { type: String, required: true },
  allowDuplicates: { type: Boolean, required: true },
  date: { type: Date, default: Date.now },
});

export const HighScore = mongoose.model("Highscore", highscoreSchema);

import express from "express";
import { HighScore } from "../models/Highscore.js";
import { formatTime, formatDateTime } from "../utils/formatTime.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const rawScores = await HighScore.find()
    .sort({ time: 1, attempts: 1 })
    .lean();

  const scores = rawScores.map((score) => ({
    ...score,
    formattedTime: formatTime(score.time),
    formattedDate: formatDateTime(score.date),
  }));

  res.render("highscore", { title: "Leaderboard", scores });
});

export default router;

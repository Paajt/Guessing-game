import express from "express";
import { HighScore } from "../models/Highscore.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const scores = await HighScore.find().sort({ time: 1, attempts: 1 }).lean();
  console.log("SCORES TO VIEW:", scores);
  res.render("highscore", { title: "Highscore-lista", scores });
});

export default router;

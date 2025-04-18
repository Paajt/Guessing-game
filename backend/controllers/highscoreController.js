import { HighScore } from "../models/Highscore.js";

export async function saveHighscore(req, res) {
  try {
    const { name, attempts, time, targetWord, allowDuplicates } = req.body;

    if (
      !name ||
      attempts == null ||
      time == null ||
      !targetWord ||
      allowDuplicates == null
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newScore = await HighScore.create({
      name,
      attempts,
      time,
      targetWord,
      allowDuplicates,
    });

    res.status(201).json(newScore);
  } catch (err) {
    console.error("Failed to save highscore:", err);
    res.status(500).json({ error: "Could not save highscore" });
  }
}

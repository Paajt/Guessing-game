import { HighScore } from "../models/Highscore.js";

export async function saveHighscore(req, res) {
  try {
    const { name, attempts, time, wordLength, allowDuplicates } = req.body;

    if (
      !name ||
      attempts == null ||
      time == null ||
      wordLength == null ||
      allowDuplicates == null
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newScore = await HighScore.create({
      name,
      attempts,
      time,
      wordLength,
      allowDuplicates,
    });

    res.status(201).json(newScore);
  } catch (err) {
    console.error("Failed to save highscore:", err);
    res.status(500).json({ error: "Could not save highscore" });
  }
}

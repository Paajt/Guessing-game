import { loadWords } from "../utils/loadWords.js";

export async function getRandomWord(req, res) {
  const length = parseInt(req.query.length || "5");
  const allowDuplicates = req.query.duplicates === "true";

  try {
    const words = await loadWords();
    const filtered = words.filter((word) => {
      if (word.length !== length) return false;
      if (!allowDuplicates) {
        const unique = new Set(word);
        if (unique.size !== word.length) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      return res
        .status(404)
        .json({ error: "No words found for given filters" });
    }

    const word = filtered[Math.floor(Math.random() * filtered.length)];
    console.log("Chosen word:", word);

    res.json({ word });
  } catch (err) {
    console.error("Error in getRandomWord:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

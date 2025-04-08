import express from "express";
import wordRoutes from "./routes/wordRoutes.js";
import { connectToDatabase } from "./db/connect.js";
import highscoreRoutes from "./routes/highscoreRoutes.js";

const app = express();
const PORT = 5080;

app.use("/api/word", wordRoutes);

app.use(express.json());
app.use("/api/highscore", highscoreRoutes);

await connectToDatabase();

app.listen(PORT, () => {
  console.log(`Backend is running on localhost:${PORT}`);
});

import express from "express";
import { engine } from "express-handlebars";
import wordRoutes from "./routes/wordRoutes.js";
import viewRoutes from "./routes/viewRoutes.js";
import { connectToDatabase } from "./db/connect.js";
import highscoreRoutes from "./routes/highscoreRoutes.js";
import infoRoutes from "./routes/infoRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5080;

app.engine("handlebars", engine({ partialsDir: "./views/partials" }));
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public"));

app.use(express.json());

app.use("/api/word", wordRoutes);

app.use("/api/highscore", highscoreRoutes);

app.use("/highscores", viewRoutes);

app.use("/info", infoRoutes);

// --- Serve built React app ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use((req, res, next) => {
  if (
    req.path.startsWith("/api") ||
    req.path.startsWith("/highscores") ||
    req.path.startsWith("/info")
  ) {
    return next();
  }

  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

await connectToDatabase();

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});

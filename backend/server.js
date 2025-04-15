import express from "express";
import { engine } from "express-handlebars";
import wordRoutes from "./routes/wordRoutes.js";
import viewRoutes from "./routes/viewRoutes.js";
import { connectToDatabase } from "./db/connect.js";
import highscoreRoutes from "./routes/highscoreRoutes.js";
import infoRoutes from "./routes/infoRoutes.js";

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

await connectToDatabase();

app.listen(PORT, () => {
  console.log(`Backend is running on localhost:${PORT}`);
});

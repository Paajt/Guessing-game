import express from "express";
import wordRoutes from "./routes/wordRoutes.js";

const app = express();
const PORT = 5080;

app.use("/api/word", wordRoutes);

app.listen(PORT, () => {
  console.log(`Backend is running on localhost:${PORT}`);
});

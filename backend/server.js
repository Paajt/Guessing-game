import express from "express";
import wordRoutes from "./routes/wordRoutes.js";
import { connectToDatabase } from "./db/connect.js";

const app = express();
const PORT = 5080;

app.use("/api/word", wordRoutes);

await connectToDatabase();

app.listen(PORT, () => {
  console.log(`Backend is running on localhost:${PORT}`);
});

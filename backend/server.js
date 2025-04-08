import express from "express";

const app = express();
const PORT = 5080;

app.get("/api/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.listen(PORT, () => {
  console.log(`Backend is running on localhost:${PORT}`);
});

import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  res.render("info", { title: "Info" });
});

export default router;

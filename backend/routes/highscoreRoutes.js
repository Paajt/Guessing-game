import express from "express";
import { saveHighscore } from "../controllers/highscoreController.js";

const router = express.Router();

router.post("/", saveHighscore);

export default router;

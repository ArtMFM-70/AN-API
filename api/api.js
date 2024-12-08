import express from "express";
import { AlphaNum } from "@starc347/alpha-num";

const router = express.Router();
router.get("/encode", (req, res) => {
  const { text } = req.query;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  const encoded = AlphaNum.encode(text);
  res.json({ encoded });
});
router.get("/decode", (req, res) => {
  const { text } = req.query;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  const decoded = AlphaNum.decode(text);
  res.json({ decoded });
});

export default router;

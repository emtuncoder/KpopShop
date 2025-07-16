// routes/artist.routes.js
import express from "express";
import Artist from "../models/Artist.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newArtist = new Artist(req.body);
    const saved = await newArtist.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// /routes/artist.js
router.get("/", async (req, res) => {
  const { name } = req.query;
  if (name) {
    const artist = await Artist.findOne({ name });
    if (!artist) return res.status(404).json({ error: "Artist not found" });
    return res.json(artist);
  }
  const all = await Artist.find();
  res.json(all);
});


router.get("/", async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json(artists);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
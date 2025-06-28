import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config();

if (!process.env.DB_PASSWORD) {
  console.warn("Warning: DB_PASSWORD environment variable is not set.");
}

const app = express();
app.use(cors());
// Increase payload limit for JSON and urlencoded bodies to handle large base64 images
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// Connect to MongoDB Atlas, specifying the database name in the URI
const mongoUri = `mongodb+srv://deril:${process.env.DB_PASSWORD}@pcbuilder.7lis3so.mongodb.net/psg_website?retryWrites=true&w=majority&appName=pcbuilder`;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("MongoDB connected successfully.");
  })
  .catch((err) => {
    console.error("MongoDB initial connection error:", err);
  });

mongoose.connection.on("error", (err) => {
  console.error("MongoDB runtime connection error:", err);
});

const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  imageData: String,
  publishedAt: Date,
});

const News = mongoose.model("News", newsSchema);

app.get("/api/news", async (req, res) => {
  try {
    const newsList = await News.find({}).sort({ publishedAt: -1 });
    res.json(newsList);
  } catch (err) {
    console.error("Error fetching news:", err); // Add this line for debugging
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

const fixtureSchema = new mongoose.Schema({
  competition: String,
  stage: String,
  homeTeam: String,
  awayTeam: String,
  date: Date,
  venue: String,
  status: String,
});

const Fixture = mongoose.model("Fixture", fixtureSchema);

app.get("/api/fixtures", async (req, res) => {
  try {
    const fixtures = await Fixture.find({}).sort({ date: 1 });
    res.json(fixtures);
  } catch (err) {
    console.error("Error fetching fixtures:", err);
    res.status(500).json({ error: "Failed to fetch fixtures" });
  }
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const db = mongoose.connection.db;
    const users = db.collection("users");
    // Find user with either role
    const user = await users.findOne({ username, password });
    if (user) {
      res.json({ success: true, role: user.role });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

const playerSchema = new mongoose.Schema({
  number: Number,
  name: String,
  position: String,
  image: String,
});

const Player = mongoose.model("Player", playerSchema);

app.get("/api/players", async (req, res) => {
  try {
    const players = await Player.find({});
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch players" });
  }
});

app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const db = mongoose.connection.db;
    const users = db.collection("users");
    const existing = await users.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Username already exists" });
    }
    await users.insertOne({ username, password, role: "user" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Add/Update News endpoints
app.post("/api/news", async (req, res) => {
  try {
    const { title, content, imageData, publishedAt } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }
    const news = new News({
      title,
      content,
      imageData: imageData || "",
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
    });
    await news.save();
    res.json({ success: true, news });
  } catch (err) {
    res.status(500).json({ message: "Failed to add news" });
  }
});

app.put("/api/news/:id", async (req, res) => {
  try {
    const { title, content, imageData, publishedAt } = req.body;
    const update = {
      title,
      content,
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
    };
    // Only update imageData if provided (including empty string to remove image)
    if (imageData !== undefined) update.imageData = imageData;
    const news = await News.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json({ success: true, news });
  } catch (err) {
    res.status(500).json({ message: "Failed to update news" });
  }
});

// Delete News endpoint
app.delete("/api/news/:id", async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete news" });
  }
});

// Add Fixture endpoint
app.post("/api/fixtures", async (req, res) => {
  try {
    const { competition, stage, homeTeam, awayTeam, date, venue, status } =
      req.body;
    if (!competition || !homeTeam || !awayTeam || !date) {
      return res.status(400).json({
        message: "Competition, Home Team, Away Team, and Date are required",
      });
    }
    const fixture = new Fixture({
      competition,
      stage,
      homeTeam,
      awayTeam,
      date: new Date(date),
      venue,
      status,
    });
    await fixture.save();
    res.json({ success: true, fixture });
  } catch (err) {
    res.status(500).json({ message: "Failed to add fixture" });
  }
});

// Delete Fixture endpoint
app.delete("/api/fixtures/:id", async (req, res) => {
  try {
    const fixture = await Fixture.findByIdAndDelete(req.params.id);
    if (!fixture) return res.status(404).json({ message: "Fixture not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete fixture" });
  }
});

// Add Player endpoint
app.post("/api/players", async (req, res) => {
  try {
    const { number, name, position, image } = req.body;
    if (!number || !name || !position || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const player = new Player({
      number,
      name,
      position,
      image,
    });
    await player.save();
    res.json({ success: true, player });
  } catch (err) {
    res.status(500).json({ message: "Failed to add player" });
  }
});

// Delete Player endpoint
app.delete("/api/players/:id", async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete player" });
  }
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from 'public' (for favicon, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Serve static files from 'dist' (React build output)
app.use(express.static(path.join(__dirname, "dist")));

// Set Content-Security-Policy header
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https:; connect-src 'self';"
  );
  next();
});

// Serve index.html for all non-API routes (for React Router)
app.get(/^\/(?!api).*/, (req, res) => {
  const indexPath = path.join(__dirname, "dist", "index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send("index.html not found");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

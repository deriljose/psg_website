import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Connect to MongoDB Atlas, specifying the database name in the URI
mongoose.connect(
  `mongodb+srv://deril:${process.env.DB_PASSWORD}@pcbuilder.7lis3so.mongodb.net/psg_website?retryWrites=true&w=majority&appName=pcbuilder`
);
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
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
    // Use mongoose to access the users collection in the same database
    const db = mongoose.connection.db;
    const users = db.collection("users");
    const user = await users.findOne({ username, password, role: "admin" });
    if (user) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

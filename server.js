import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your MongoDB connection string
mongoose.connect("mongodb://localhost:27017/psg_website", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
    // Make sure you are using the correct database and collection
    const newsList = await db.collection("news").find({}).toArray();
    res.json(newsList);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

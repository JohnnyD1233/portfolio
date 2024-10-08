import express from "express";
import mongoose from "mongoose";
import env from "dotenv";
import Item from "./models/item.js";
import cors from "cors";

env.config();

const app = express();
const PORT = process.env.PORT;
express.urlencoded({ extended: true });
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000", // Only allow requests from this origin
  })
);

// Connect to Mongo Database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.post("/api/add/item", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    console.log(`${req.body.title} Has been Added to ${req.body.category}`);
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ message: "Error adding item", error });
  }
});

app.get("/api/data/TV-series", async (req, res) => {
  try {
    const items = await Item.find({ category: "TV-Series" });
    res.json(items);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/data/movies", async (req, res) => {
  try {
    const items = await Item.find({ category: "Movies" });
    res.json(items);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/data/Video-Games", async (req, res) => {
  try {
    const items = await Item.find({ category: "Video-Games" }).sort({
      releaseYear: 1,
    });
    res.json(items);
    // console.log(items);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/api/edit/item/:id", async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      category: req.body.category,
      description: req.body.description,
      image: req.body.image,
    };
    console.log("Request Body:", JSON.stringify(req.body.id));
    const id = req.body.id;
    const updatedItem = await Item.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validators are run on the updated fields
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item updated successfully", updatedItem });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

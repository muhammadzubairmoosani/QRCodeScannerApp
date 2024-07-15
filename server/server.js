import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// Initialize Express app
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://test_user:test_user123@cluster0.uso8mpp.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Define a schema
const dataSchema = new mongoose.Schema(
  {
    type: { type: Number, required: true },
    data: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

// Create a model
const DataModel = mongoose.model("Data", dataSchema);

// POST API to add new data
app.post("/data", async (req, res) => {
  try {
    const { type, data, text } = req.body;
    // Create a new document
    const newData = new DataModel({ type, data, text });
    // Save the document
    await newData.save();
    res.status(201).send(newData);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET API to retrieve data by type, data, and text
app.get("/data", async (req, res) => {
  try {
    // Find documents matching the query
    const foundData = await DataModel.find({ text: req.query.text });
    res.send(foundData);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

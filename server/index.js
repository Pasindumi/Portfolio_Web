const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();

// Improved CORS for production
const allowedOrigin = process.env.CLIENT_URL ? process.env.CLIENT_URL.replace(/\/$/, "") : "http://localhost:3000";

app.use(cors({
  origin: allowedOrigin,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB Connection Failed:", err));

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false }, // New read status
  createdAt: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

// Multer Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, "cv.pdf");
  }
});

const upload = multer({ storage });

app.get("/api/contact", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error("GET /api/contact Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, phone, email, subject, message } = req.body;
  if (!name || !phone || !email || !subject || !message) return res.status(400).json({ success: false });

  try {
    const newContact = new Contact({ name, phone, email, subject, message });
    await newContact.save();
    res.json({ success: true });
  } catch (err) {
    console.error("POST /api/contact Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.patch("/api/contact/:id/read", async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ success: false, message: "Contact not found" });

    contact.read = !contact.read;
    await contact.save();
    res.json({ success: true, read: contact.read });
  } catch (err) {
    console.error("PATCH /api/contact/:id/read Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/cv/upload", upload.single("cv"), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
  res.json({ success: true, message: "CV Uploaded Successfully", filename: req.file.filename });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(express.json());
app.use(express.static(__dirname));

// HOME PAGE (IMPORTANT)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// API (simple test)
app.get("/api", (req, res) => {
  res.json({ message: "AI working 🚀" });
});

// start server
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

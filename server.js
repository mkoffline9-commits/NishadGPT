import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// 1. यह लाइन आपकी index.html और CSS को लोड करने में मदद करेगी
app.use(express.static(__dirname));

const API_KEY = process.env.API_KEY;

// 2. होम पेज (index.html) दिखाने के लिए रूट
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.json({ reply: "Question empty hai! 🧐" });
    }

    // Google Gemini API Call
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: text }] }],
        }),
      }
    );

    const data = await response.json();
    
    // API से सही जवाब निकालना
    const aiReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Maaf kijiye, main samajh nahi paya.";
    
    res.json({ reply: aiReply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "Server side error aa rahi hai. 🛠️" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

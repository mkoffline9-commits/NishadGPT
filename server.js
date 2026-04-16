import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ SAFE (env variable)
const API_KEY = process.env.API_KEY;

app.post("/api", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.json({ reply: "Question empty hai 😅" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text }]
            }
          ]
        }),
      }
    );

    const data = await response.json();

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response 😢";

    res.json({ reply });

  } catch (error) {
    console.log(error);
    res.json({ reply: "Error aa gaya 😢" });
  }
});

// ✅ Render compatible port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

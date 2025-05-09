import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { OpenAI } from 'openai';
import cors from 'cors';

const app = express();
const upload = multer({ dest: "uploads/" });

// Enable CORS
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Existing audio upload endpoint
app.post("/api/upload-audio", upload.single("audio"), async (req, res) => {
  try {
    const audioPath = req.file.path;
    const fileStream = fs.createReadStream(audioPath);

    const transcript = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file: fileStream,
      response_format: "json",
    });

    fs.unlinkSync(audioPath); // Clean up

    res.json({ transcript: transcript.text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
}); 
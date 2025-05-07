require('dotenv').config();
console.log('Loaded OPENAI_API_KEY:', process.env.OPENAI_API_KEY);
console.log('Loaded OPENAI_PROJECT_ID:', process.env.OPENAI_PROJECT_ID);
console.log('Loaded OPENAI_ORG_ID:', process.env.OPENAI_ORG_ID);

const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { OpenAI } = require('openai');
const cors = require('cors');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  project: process.env.OPENAI_PROJECT_ID,
  organization: process.env.OPENAI_ORG_ID,  // optional
});

const port = 3001;

app.use(cors());

// Universal request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

async function translateText(text, targetLanguage) {
  const prompt = `Translate the following Malaysian patient symptom description to ${targetLanguage}, preserving medical terms: ${text}`;
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a medical translator." },
      { role: "user", content: prompt }
    ]
  });
  return response.choices[0].message.content;
}

app.post('/api/upload-audio', upload.single('audio'), async (req, res) => {
  try {
    console.log('Received POST /api/upload-audio');
    if (!req.file) {
      throw new Error('No audio file received in the request');
    }

    const inputPath = req.file.path;
    const outputPath = path.join('uploads', `${req.file.filename}.mp3`);

    // Convert to mp3 using ffmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(inputPath)
        .toFormat('mp3')
        .on('end', () => {
          console.log('Audio conversion finished');
          resolve();
        })
        .on('error', (err) => {
          console.error('FFmpeg error:', err);
          reject(err);
        })
        .save(outputPath);
    });

    const fileStream = fs.createReadStream(outputPath);

    const transcript = await openai.audio.transcriptions.create({
      model: 'whisper-1',
      file: fileStream,
      response_format: 'json',
    });

    // Cleanup files
    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);

    // Translate
    const englishTranslation = await translateText(transcript.text, 'English');
    const malayTranslation = await translateText(transcript.text, 'Malay');

    res.json({ transcript: transcript.text, english: englishTranslation, malay: malayTranslation });

  } catch (err) {
    console.error('Transcription error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Mock endpoint to create a Zoom meeting (no actual API call)
app.post('/api/create-zoom-meeting', (req, res) => {
  // Generate a mock Zoom meeting link
  const mockMeetingId = Math.random().toString(36).substring(2, 10);
  const join_url = `https://zoom.us/j/${mockMeetingId}`;
  const start_url = `https://zoom.us/s/${mockMeetingId}`;
  res.json({ join_url, start_url });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
}); 
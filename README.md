# MY-Care - AI-Powered Healthcare Platform

MY-Care is an innovative healthcare platform that leverages AI and LLM technologies to provide multilingual symptom analysis, medical record management, and virtual health assistance.

## Features

- **AI Symptom Analysis:** Submit symptoms via text or voice for AI-powered preliminary analysis
- **Multilingual Support:** Operates in English, Malay, Chinese, and Tamil
- **Voice Recognition:** Record symptoms verbally with automatic transcription and translation
- **Virtual Health Assistant:** Chat-based assistant for health queries and medication reminders
- **Medical Records:** Securely store and access patient medical history
- **Hospital Recommendations:** Get hospital suggestions based on condition and location

## Technology Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend:** Node.js/Express and Flask (Python)
- **AI Integration:** OpenAI GPT-3.5 Turbo for diagnosis, Whisper for voice transcription
- **Real-time Communication:** Socket.IO

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- Python (3.8+)
- OpenAI API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/doccare.git
   cd doccare
   ```

2. Install frontend dependencies:
   ```
   npm install
   ```

3. Install backend dependencies:
   ```
   cd backend
   pip install -r requirements.txt
   cd ..
   ```

4. Create environment variables:
   - Create a `.env` file in the root directory
   - Add your OpenAI API key:
     ```
     VITE_OPENAI_API_KEY=your_openai_api_key
     ```

5. Start the development servers:
   ```
   # Start Node.js server
   node server.js
   
   # In another terminal, start Flask backend
   cd backend
   flask run
   
   # In another terminal, start frontend
   npm run dev
   ```
   
## AI/LLM Integration

DocCare leverages AI/LLM technologies in several key ways:

1. **Symptom Analysis:** Uses GPT-3.5-TURBO to analyze patient-reported symptoms, providing preliminary condition assessments, urgency ratings, and recommended tests.

2. **Voice Recognition:** Implements OpenAI's Whisper model to transcribe spoken symptoms and translate them if needed.

3. **Medical Translation:** Provides accurate medical terminology translation across multiple languages.

4. **Hospital Recommendations:** Suggests suitable hospitals based on the patient's condition, location, and special needs.

5. **Virtual Health Assistant:** Powers the chat interface for answering medical questions and managing health information.

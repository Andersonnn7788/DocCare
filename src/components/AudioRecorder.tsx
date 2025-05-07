import React, { useRef, useState } from "react";

interface AudioRecorderProps {
  onTranscript: (text: string, english?: string, malay?: string) => void;
}

const AudioRecorder = ({ onTranscript }: AudioRecorderProps) => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ transcript?: string; english?: string; malay?: string }>({});
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    setAudioURL(null);
    setResult({});
    setRecording(true);
    audioChunks.current = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.current.push(event.data);
      }
    };
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
      setAudioURL(URL.createObjectURL(audioBlob));
      uploadAudio(audioBlob);
      stream.getTracks().forEach((track) => track.stop());
    };
    mediaRecorder.start();
  };

  const stopRecording = () => {
    setRecording(false);
    mediaRecorderRef.current?.stop();
  };

  const uploadAudio = async (audioBlob: Blob) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("audio", audioBlob, "audio.webm");
    try {
      const res = await fetch('http://localhost:3001/api/upload-audio', {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.transcript) {
        setResult({ transcript: data.transcript, english: data.english, malay: data.malay });
        onTranscript(data.transcript, data.english, data.malay);
      } else {
        alert("Transcription failed.");
      }
    } catch (err) {
      alert("Error uploading audio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <div>
        <button
          onClick={startRecording}
          disabled={recording || loading}
          style={{ marginRight: 8, padding: '6px 16px', borderRadius: 4, border: '1px solid #2563eb', background: recording ? '#e0e7ff' : '#2563eb', color: '#fff', fontWeight: 500, cursor: recording || loading ? 'not-allowed' : 'pointer' }}
        >
          Start Recording
        </button>
        <button
          onClick={stopRecording}
          disabled={!recording || loading}
          style={{ padding: '6px 16px', borderRadius: 4, border: '1px solid #ef4444', background: !recording ? '#fee2e2' : '#ef4444', color: '#fff', fontWeight: 500, cursor: !recording || loading ? 'not-allowed' : 'pointer' }}
        >
          Stop Recording
        </button>
        {loading && <span style={{ marginLeft: 12 }}>Transcribing & Translating...</span>}
      </div>
      {audioURL && (
        <audio controls src={audioURL} style={{ marginTop: 8 }} />
      )}
      {(result.transcript || result.english || result.malay) && (
        <div style={{ marginTop: 12, background: '#f1f5f9', borderRadius: 6, padding: 12 }}>
          {result.transcript && <div><strong>Transcript:</strong> <span>{result.transcript}</span></div>}
          {result.english && <div><strong>English:</strong> <span>{result.english}</span></div>}
          {result.malay && <div><strong>Malay:</strong> <span>{result.malay}</span></div>}
        </div>
      )}
    </div>
  );
};

export default AudioRecorder; 
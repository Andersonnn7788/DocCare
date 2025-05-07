import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AIDiagnosticForm from "@/components/AIDiagnosticForm";
import AIDiagnosisResult from "@/components/AIDiagnosisResult";
import MedicalRecordUploader from "@/components/MedicalRecordUploader";
import { Consultation, MedicalRecord } from "@/types/medical";
import { initializeMockData } from "@/services/consultationService";
import { toast } from "sonner";
// @ts-ignore: If you see a type error, ensure axios is installed: npm install axios
import axios from "axios";

// Mock patient data
const patientId = "p12345";
const patientName = "John Doe";
const patientLocation = "Kuala Lumpur";

const DemoDiagnosisPage = () => {
  const [step, setStep] = useState<"form" | "result" | "doctor">("form");
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([
    {
      id: "rec1",
      patientId: patientId,
      date: "2023-01-15T08:30:00Z",
      diagnosis: "Hypertension, stage 1",
      treatment: "Prescribed Lisinopril 10mg daily",
      notes: "Patient advised to reduce sodium intake and exercise regularly",
      doctorId: "doc123",
      doctorName: "Dr. Sarah Chen"
    },
    {
      id: "rec2",
      patientId: patientId,
      date: "2023-06-22T10:15:00Z",
      diagnosis: "Common cold",
      treatment: "Rest and over-the-counter cold medication",
      notes: "Follow up if symptoms persist beyond 7 days",
      doctorId: "doc456",
      doctorName: "Dr. Michael Wong"
    }
  ]);
  const navigate = useNavigate();
  
  // Initialize mock data for the demo
  useEffect(() => {
    initializeMockData();
    toast.success("AI Diagnosis Demo initialized");
  }, []);

  const handleConsultationComplete = (newConsultation: Consultation) => {
    setConsultation(newConsultation);
    setStep("result");
  };

  const handleRequestDoctor = () => {
    setStep("doctor");
  };

  const handleReturnHome = () => {
    navigate('/');
  };

  const renderStep = () => {
    switch (step) {
      case "form":
        return (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-2">
                <AIDiagnosticForm
                  patientId={patientId}
                  onComplete={handleConsultationComplete}
                />
              </div>
              <div>
                <MedicalRecordUploader
                  patientId={patientId}
                  records={medicalRecords}
                  onRecordsChange={setMedicalRecords}
                />
              </div>
            </div>
          </div>
        );
        
      case "result":
        return consultation ? (
          <AIDiagnosisResult
            consultation={consultation}
            patientLocation={patientLocation}
            onRequestDoctor={handleRequestDoctor}
          />
        ) : (
          <div className="text-center py-8">
            No consultation data available.
            <Button 
              onClick={() => setStep("form")} 
              className="mt-4"
            >
              Start Over
            </Button>
          </div>
        );
        
      case "doctor":
        return (
          <VideoChatWithDoctor onReturnHome={handleReturnHome} onStartNew={() => setStep("form")} />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          AI Diagnosis Demo
        </h1>
        <p className="text-slate-600">
          This demo showcases how MY-Care's AI can analyze symptoms and provide preliminary insights.
          In a real implementation, this would connect to your electronic health records.
        </p>
      </div>
      
      {renderStep()}
      
      <style>
        {`
          .card {
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
};

const VideoChatWithDoctor = ({ onReturnHome, onStartNew }: { onReturnHome: () => void; onStartNew: () => void }) => {
  const [loading, setLoading] = useState(false);
  const [zoomLink, setZoomLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleJoinVideo = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/create-zoom-meeting");
      setZoomLink(res.data.join_url);
    } catch (err) {
      setError("Failed to get video chat link. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="card p-6">
      <div className="text-center py-8 space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-violet-100 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-violet-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m0-6l4.72-2.36A.75.75 0 0122 7.25v9.5a.75.75 0 01-1.03.68L15.75 15" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold">Connect with a Doctor</h2>
        <p className="text-gray-600 max-w-md mx-auto">
          You can now join a secure video chat with a qualified doctor. Click below to enter the video consultation room.
        </p>
        {!zoomLink ? (
          <Button onClick={handleJoinVideo} disabled={loading} className="mt-4">
            {loading ? "Preparing Video Chat..." : "Enter Video Chat"}
          </Button>
        ) : (
          <a href={zoomLink} target="_blank" rel="noopener noreferrer">
            <Button className="mt-4 bg-violet-600 hover:bg-violet-700 text-white">
              Join Video Chat
            </Button>
          </a>
        )}
        {error && <div className="text-red-500 mt-2">{error}</div>}
        <div className="pt-6">
          <Button onClick={onStartNew} variant="outline" className="mr-4">
            Start New Consultation
          </Button>
          <Button onClick={onReturnHome}>Return to Home</Button>
        </div>
      </div>
    </div>
  );
};

export default DemoDiagnosisPage;

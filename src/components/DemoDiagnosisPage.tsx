
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AIDiagnosticForm from "@/components/AIDiagnosticForm";
import AIDiagnosisResult from "@/components/AIDiagnosisResult";
import MedicalRecordUploader from "@/components/MedicalRecordUploader";
import { Consultation, MedicalRecord } from "@/types/medical";
import ApiKeyInput from "./ApiKeyInput";
import { useOpenAIApiKey } from "@/lib/openai";
import { initializeMockData } from "@/services/consultationService";
import { toast } from "sonner";

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
  const { isKeySet } = useOpenAIApiKey();
  
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
            <ApiKeyInput />
            
            {isKeySet && (
              <>
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
              </>
            )}
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
          <div className="card p-6">
            <div className="text-center py-8 space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-emerald-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold">Doctor Requested!</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Your consultation has been submitted. A qualified doctor will connect
                with you shortly via video call.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 max-w-sm mx-auto mt-6">
                <p className="text-sm text-gray-500">Estimated wait time</p>
                <p className="text-lg font-semibold text-gray-800">5-10 minutes</p>
              </div>
              <div className="pt-6">
                <Button 
                  onClick={() => setStep("form")} 
                  variant="outline" 
                  className="mr-4"
                >
                  Start New Consultation
                </Button>
                <Button onClick={handleReturnHome}>Return to Home</Button>
              </div>
            </div>
          </div>
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

export default DemoDiagnosisPage;

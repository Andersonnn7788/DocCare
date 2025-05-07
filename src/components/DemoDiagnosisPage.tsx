
import { useState, useEffect } from "react";
import AIDiagnosticForm from "./AIDiagnosticForm";
import AIDiagnosisResult from "./AIDiagnosisResult";
import MedicalRecordUploader from "./MedicalRecordUploader";
import { Consultation } from "@/types/medical";
import { Button } from "./ui/button";
import { toast } from "@/components/ui/sonner";
import { initializeMockData } from "@/services/consultationService";

const mockPatientId = "p1"; // Ahmad from our mock data

const DemoDiagnosisPage = () => {
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [step, setStep] = useState<'upload' | 'diagnosis' | 'result'>('upload');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [showDoctorModal, setShowDoctorModal] = useState(false);

  // Initialize mock data when component mounts
  useEffect(() => {
    initializeMockData();
  }, []);

  const handleFileUploadComplete = (fileUrls: string[]) => {
    setUploadedFiles(fileUrls);
    if (fileUrls.length > 0) {
      toast.success("Medical records uploaded successfully");
      
      // Automatically proceed to diagnosis step after successful upload
      setTimeout(() => {
        setStep('diagnosis');
      }, 1000);
    }
  };

  const handleSkipUpload = () => {
    setStep('diagnosis');
  };

  const handleConsultationComplete = (newConsultation: Consultation) => {
    setConsultation(newConsultation);
    setStep('result');
  };

  const handleRequestDoctor = () => {
    setShowDoctorModal(true);
    
    // Simulate doctor assignment after a delay
    setTimeout(() => {
      setShowDoctorModal(false);
      toast.success("Doctor assigned! Dr. Sarah will join your consultation shortly");
    }, 3000);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          MY-Care AI Diagnosis
        </h1>
        <p className="text-gray-600">
          Get a preliminary AI-powered diagnosis in your preferred language
        </p>
      </div>
      
      {/* Progress Steps */}
      <div className="flex items-center mb-8">
        <div className={`step-item ${step === 'upload' ? 'active' : step === 'diagnosis' || step === 'result' ? 'completed' : ''}`}>
          <div className="step-circle">1</div>
          <div className="step-text">Upload Records</div>
        </div>
        <div className="step-line"></div>
        <div className={`step-item ${step === 'diagnosis' ? 'active' : step === 'result' ? 'completed' : ''}`}>
          <div className="step-circle">2</div>
          <div className="step-text">Describe Symptoms</div>
        </div>
        <div className="step-line"></div>
        <div className={`step-item ${step === 'result' ? 'active' : ''}`}>
          <div className="step-circle">3</div>
          <div className="step-text">Review & Consult</div>
        </div>
      </div>
      
      {/* Content based on current step */}
      {step === 'upload' && (
        <div>
          <MedicalRecordUploader 
            patientId={mockPatientId} 
            onUploadComplete={handleFileUploadComplete} 
          />
          <div className="mt-4 text-center">
            <Button 
              variant="link" 
              onClick={handleSkipUpload}
            >
              Skip this step
            </Button>
          </div>
        </div>
      )}
      
      {step === 'diagnosis' && (
        <AIDiagnosticForm 
          patientId={mockPatientId} 
          onComplete={handleConsultationComplete} 
        />
      )}
      
      {step === 'result' && consultation && (
        <AIDiagnosisResult 
          consultation={consultation} 
          patientLocation="Kuala Lumpur"
          onRequestDoctor={handleRequestDoctor} 
        />
      )}
      
      {/* Doctor request modal - simplified for demo */}
      {showDoctorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Connecting to Doctor</h3>
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
            </div>
            <p className="text-center text-gray-700">
              Finding an available doctor who speaks your language...
            </p>
          </div>
        </div>
      )}
      
      {/* Add custom styles for progress steps */}
      <style jsx>{`
        .step-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
        }
        
        .step-circle {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #e5e7eb;
          color: #9ca3af;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 6px;
        }
        
        .step-text {
          font-size: 14px;
          color: #9ca3af;
        }
        
        .step-line {
          flex: 1;
          height: 2px;
          background-color: #e5e7eb;
          margin: 0 8px;
        }
        
        .step-item.active .step-circle {
          background-color: #059669;
          color: white;
        }
        
        .step-item.active .step-text {
          color: #059669;
          font-weight: 500;
        }
        
        .step-item.completed .step-circle {
          background-color: #10b981;
          color: white;
        }
        
        .step-item.completed + .step-line {
          background-color: #10b981;
        }
      `}</style>
    </div>
  );
};

export default DemoDiagnosisPage;

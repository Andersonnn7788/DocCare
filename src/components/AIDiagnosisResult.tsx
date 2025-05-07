
import React from 'react';
import { Consultation, Hospital } from "@/types/medical";
import { Button } from "./ui/button";
import { AlertTriangle, Check, Clock, X } from "lucide-react";
import { getHospitalRecommendations } from "@/services/consultationService";
import { useState } from "react";
import { HospitalRecommendation } from "@/lib/openai";

interface AIDiagnosisResultProps {
  consultation: Consultation;
  patientLocation?: string;
  onRequestDoctor: () => void;
}

const AIDiagnosisResult: React.FC<AIDiagnosisResultProps> = ({
  consultation,
  patientLocation = "Kuala Lumpur",
  onRequestDoctor
}) => {
  const [hospitals, setHospitals] = useState<HospitalRecommendation[]>([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [showHospitals, setShowHospitals] = useState(false);

  const { aiDiagnosis } = consultation;
  if (!aiDiagnosis) {
    return <div>No diagnosis available</div>;
  }
  
  const { possibleConditions, urgencyLevel, notes } = aiDiagnosis;

  // Get urgency level class
  const getUrgencyClass = () => {
    if (urgencyLevel >= 8) return "text-red-600";
    if (urgencyLevel >= 5) return "text-amber-600";
    return "text-green-600";
  };

  // Get urgency level text
  const getUrgencyText = () => {
    if (urgencyLevel >= 8) return "High";
    if (urgencyLevel >= 5) return "Medium";
    return "Low";
  };

  // Get urgency level icon
  const getUrgencyIcon = () => {
    if (urgencyLevel >= 8) return <AlertTriangle className="h-5 w-5 text-red-600" />;
    if (urgencyLevel >= 5) return <Clock className="h-5 w-5 text-amber-600" />;
    return <Check className="h-5 w-5 text-green-600" />;
  };

  const handleFindHospitals = async () => {
    if (possibleConditions.length === 0) return;
    
    setLoadingHospitals(true);
    try {
      const condition = possibleConditions[0].condition;
      const recommendations = await getHospitalRecommendations(
        condition,
        patientLocation,
        urgencyLevel,
        []
      );
      setHospitals(recommendations);
      setShowHospitals(true);
    } catch (error) {
      console.error("Error getting hospital recommendations:", error);
    } finally {
      setLoadingHospitals(false);
    }
  };

  return (
    <div className="card p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">AI Preliminary Analysis</h2>
        <p className="text-gray-500 text-sm mb-4">
          This is a preliminary analysis based on your symptoms. A qualified doctor will review this information.
        </p>
        
        <div className="flex items-center gap-2 p-3 rounded-md bg-slate-50 mb-4">
          {getUrgencyIcon()}
          <span className="font-medium">Priority Level:</span>
          <span className={`font-semibold ${getUrgencyClass()}`}>
            {getUrgencyText()} ({urgencyLevel}/10)
          </span>
        </div>
      </div>

      {possibleConditions.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Possible Conditions</h3>
          <ul className="space-y-2">
            {possibleConditions.map((condition, index) => (
              <li key={index} className="p-3 bg-white border rounded-md flex justify-between">
                <div>
                  <span className="font-medium">{condition.condition}</span>
                  {condition.icd10Code && (
                    <span className="ml-2 text-xs bg-slate-100 px-2 py-1 rounded">
                      {condition.icd10Code}
                    </span>
                  )}
                </div>
                <span className="text-sm">
                  {Math.round(condition.confidence * 100)}% match
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {notes && (
        <div className="mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Additional Notes</h3>
          <div className="p-3 bg-slate-50 rounded-md text-sm">
            {notes}
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-3 mt-6">
        <Button 
          onClick={onRequestDoctor} 
          className="btn-primary flex-1"
        >
          Request Doctor Consultation
        </Button>
        <Button 
          onClick={handleFindHospitals}
          className="btn-outline flex-1"
          disabled={loadingHospitals}
        >
          {loadingHospitals ? "Finding Hospitals..." : "Find Nearby Hospitals"}
        </Button>
      </div>

      {showHospitals && hospitals.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-gray-700">Recommended Hospitals</h3>
            <button 
              className="text-gray-400 hover:text-gray-600" 
              onClick={() => setShowHospitals(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            {hospitals.map((hospital, index) => (
              <div key={index} className="p-4 border rounded-lg bg-white">
                <div className="flex justify-between">
                  <h4 className="font-medium">{hospital.hospitalName}</h4>
                  <span className="text-sm text-gray-500">{hospital.distance}</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">{hospital.address}</div>
                <div className="flex justify-between mt-2">
                  <span className="text-sm">
                    Wait time: <span className="font-medium">{hospital.waitTime}</span>
                  </span>
                  <span 
                    className={`text-sm ${hospital.specialistAvailability ? 'text-green-600' : 'text-gray-500'}`}
                  >
                    {hospital.specialistAvailability ? 'Specialist available' : 'No specialist available'}
                  </span>
                </div>
                <div className="mt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => window.open(`tel:${hospital.contactNumber}`)}
                  >
                    Call {hospital.contactNumber}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIDiagnosisResult;

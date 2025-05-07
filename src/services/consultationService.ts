
import { toast } from "@/components/ui/sonner";
import { DiagnosisResult, generateDiagnosis, recommendHospitals, translateText } from "@/lib/openai";
import { Consultation, MedicalRecord, Patient } from "@/types/medical";

// Mock database for demo purposes
// In a real app, this would be replaced with actual API calls to your backend
let mockConsultations: Consultation[] = [];
let mockMedicalRecords: MedicalRecord[] = [];
let mockPatients: Patient[] = [];

// This would be a real API call in production
export const initiateConsultation = async (
  patientId: string,
  symptoms: string,
  language: string
): Promise<Consultation> => {
  try {
    // For demo purposes, if the patientId is "p12345" (from DemoDiagnosisPage), use that
    let patient = mockPatients.find(p => p.id === patientId);
    
    // If no patient found, create a demo patient for the given ID
    if (!patient) {
      const newPatient: Patient = {
        id: patientId,
        name: "Demo Patient",
        dateOfBirth: "1990-01-01",
        gender: "male",
        preferredLanguage: language || "en",
        contactNumber: "+60123456789"
      };
      mockPatients.push(newPatient);
      patient = newPatient;
    }

    // Translate symptoms if not in English
    let translatedSymptoms = symptoms;
    if (language !== "en") {
      try {
        translatedSymptoms = await translateText({
          text: symptoms,
          sourceLanguage: language,
          targetLanguage: "en"
        });
      } catch (error) {
        console.error("Translation error:", error);
        // Continue with original symptoms if translation fails
      }
    }

    // Get patient's past medical records
    const patientRecords = mockMedicalRecords.filter(
      record => record.patientId === patientId
    );

    // Generate preliminary AI diagnosis
    const aiDiagnosis = await generateDiagnosis({
      patientDescription: translatedSymptoms,
      language: "en", // Already translated
      medicalRecords: patientRecords.map(record => ({
        date: record.date,
        diagnosis: record.diagnosis,
        treatment: record.treatment,
        notes: record.notes
      }))
    });

    // Create new consultation
    const newConsultation: Consultation = {
      id: `cons-${Date.now()}`,
      patientId,
      doctorId: "", // Will be assigned later
      date: new Date().toISOString(),
      status: "scheduled",
      type: "video", // Default, can be changed
      symptoms,
      language,
      aiDiagnosis: {
        translatedSymptoms: language !== "en" ? translatedSymptoms : undefined,
        possibleConditions: aiDiagnosis.possibleConditions,
        urgencyLevel: aiDiagnosis.urgencyLevel,
        notes: aiDiagnosis.notes
      }
    };

    // Add to mock database
    mockConsultations.push(newConsultation);

    // Alert if urgent case
    if (aiDiagnosis.urgencyLevel >= 8) {
      toast.warning("This case has been flagged as urgent. Prioritizing in the queue.");
    }

    return newConsultation;
  } catch (error) {
    console.error("Error initiating consultation:", error);
    toast.error("Failed to initiate consultation. Please try again.");
    throw error;
  }
};

export const getPatientConsultations = (patientId: string): Consultation[] => {
  return mockConsultations.filter(consultation => consultation.patientId === patientId);
};

export const getDoctorConsultations = (doctorId: string): Consultation[] => {
  return mockConsultations.filter(consultation => consultation.doctorId === doctorId);
};

export const assignDoctorToConsultation = (consultationId: string, doctorId: string): Consultation | null => {
  const consultationIndex = mockConsultations.findIndex(c => c.id === consultationId);
  if (consultationIndex === -1) return null;
  
  mockConsultations[consultationIndex].doctorId = doctorId;
  mockConsultations[consultationIndex].status = "in_progress";
  return mockConsultations[consultationIndex];
};

export const completeConsultation = (
  consultationId: string, 
  doctorNotes: string,
  prescription?: string[],
  followUpRecommendation?: string
): { consultation: Consultation; medicalRecord: MedicalRecord } | null => {
  const consultationIndex = mockConsultations.findIndex(c => c.id === consultationId);
  if (consultationIndex === -1) return null;
  
  const consultation = mockConsultations[consultationIndex];
  
  // Create a medical record from the consultation
  const newRecord: MedicalRecord = {
    id: `rec-${Date.now()}`,
    patientId: consultation.patientId,
    date: new Date().toISOString(),
    diagnosis: consultation.aiDiagnosis?.possibleConditions[0]?.condition || "Unspecified",
    treatment: prescription?.join(", ") || "None prescribed",
    doctorId: consultation.doctorId,
    doctorName: "Dr. Example", // In a real app, get from doctor's profile
    notes: doctorNotes,
    followUpDate: followUpRecommendation ? new Date(followUpRecommendation).toISOString() : undefined
  };
  
  mockMedicalRecords.push(newRecord);
  
  // Update consultation
  mockConsultations[consultationIndex] = {
    ...consultation,
    status: "completed",
    doctorNotes,
    recordId: newRecord.id
  };
  
  return {
    consultation: mockConsultations[consultationIndex],
    medicalRecord: newRecord
  };
};

export const getHospitalRecommendations = async (
  condition: string,
  patientLocation: string,
  urgencyLevel: number,
  specialNeeds: string[] = []
) => {
  return recommendHospitals({
    condition,
    location: patientLocation,
    urgencyLevel,
    patientNeeds: specialNeeds
  });
};

// Mock data initialization for demo
export const initializeMockData = () => {
  // Create mock patients
  mockPatients = [
    {
      id: "p1",
      name: "Ahmad bin Abdullah",
      dateOfBirth: "1980-05-15",
      gender: "male",
      preferredLanguage: "ms",
      contactNumber: "+60123456789",
      email: "ahmad@example.com"
    },
    {
      id: "p2",
      name: "Mei Ling Tan",
      dateOfBirth: "1992-11-02",
      gender: "female",
      preferredLanguage: "zh",
      contactNumber: "+60198765432",
      email: "meiling@example.com"
    },
    {
      id: "p3",
      name: "Rajesh Kumar",
      dateOfBirth: "1975-08-23",
      gender: "male",
      preferredLanguage: "ta",
      contactNumber: "+60134567890",
      email: "rajesh@example.com"
    }
  ];
  
  // Create some medical records
  mockMedicalRecords = [
    {
      id: "mr1",
      patientId: "p1",
      date: "2023-01-15T08:30:00Z",
      diagnosis: "Hypertension, stage 1",
      treatment: "Prescribed Lisinopril 10mg daily",
      doctorId: "d1",
      doctorName: "Dr. Sarah Chen",
      notes: "Patient advised to reduce sodium intake and exercise regularly"
    },
    {
      id: "mr2",
      patientId: "p1",
      date: "2023-06-22T10:15:00Z",
      diagnosis: "Common cold",
      treatment: "Rest and over-the-counter cold medication",
      doctorId: "d2",
      doctorName: "Dr. Amir Khan",
      notes: "Follow up if symptoms persist beyond 7 days"
    },
    {
      id: "mr3",
      patientId: "p2",
      date: "2023-03-05T14:45:00Z",
      diagnosis: "Allergic rhinitis",
      treatment: "Cetirizine 10mg daily",
      doctorId: "d3",
      doctorName: "Dr. Li Wei",
      notes: "Patient reports seasonal allergies, worse during haze periods"
    }
  ];
  
  toast.success("Demo data initialized");
};

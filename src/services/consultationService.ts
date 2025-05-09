import { toast } from "@/components/ui/sonner";
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

    // Call backend for AI diagnosis
    const response = await fetch("http://localhost:5000/api/diagnosis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientId,
        symptoms,
        language
      })
    });
    if (!response.ok) {
      throw new Error("Failed to analyze symptoms");
    }
    const aiDiagnosis = await response.json();

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
        translatedSymptoms: aiDiagnosis.translatedSymptoms,
        possibleConditions: aiDiagnosis.possibleConditions,
        urgencyLevel: aiDiagnosis.urgencyLevel,
        notes: aiDiagnosis.notes
      }
    };

    mockConsultations.push(newConsultation);

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
  // Mock database of hospitals with their specialties
  const hospitals = [
    {
      hospitalName: "Kuala Lumpur General Hospital",
      address: "Jalan Pahang, 50586 Kuala Lumpur",
      specialties: ["Cardiology", "Neurology", "Emergency", "Pediatrics", "General Surgery"],
      specialistAvailability: true,
      waitTime: urgencyLevel >= 8 ? "10-15 mins" : "30-45 mins",
      distance: "2.3 km from " + patientLocation,
      contactNumber: "+60326155555",
      currentCapacity: 75
    },
    {
      hospitalName: "Pantai Hospital Kuala Lumpur",
      address: "8, Jalan Bukit Pantai, Bangsar, 59100 Kuala Lumpur",
      specialties: ["Cardiology", "Orthopedics", "Oncology", "Gastroenterology"],
      specialistAvailability: true,
      waitTime: "15-20 mins",
      distance: "4.8 km from " + patientLocation,
      contactNumber: "+60322822333",
      currentCapacity: 50
    },
    {
      hospitalName: "Gleneagles Kuala Lumpur",
      address: "286, Jalan Ampang, 50450 Kuala Lumpur",
      specialties: ["Orthopedics", "Cardiology", "Neurology", "Pediatrics"],
      specialistAvailability: true,
      waitTime: "20-30 mins",
      distance: "5.2 km from " + patientLocation,
      contactNumber: "+60320501888",
      currentCapacity: 40
    },
    {
      hospitalName: "Prince Court Medical Centre",
      address: "39, Jalan Kia Peng, 50450 Kuala Lumpur",
      specialties: ["Gastroenterology", "Neurology", "Dermatology", "Pediatrics"],
      specialistAvailability: urgencyLevel >= 7,
      waitTime: "25-35 mins",
      distance: "3.7 km from " + patientLocation,
      contactNumber: "+60321600000",
      currentCapacity: 60
    },
    {
      hospitalName: "Tung Shin Hospital",
      address: "102, Jalan Pudu, 55100 Kuala Lumpur",
      specialties: ["Traditional Chinese Medicine", "General Medicine", "Pediatrics"],
      specialistAvailability: false,
      waitTime: "40-60 mins",
      distance: "1.5 km from " + patientLocation,
      contactNumber: "+60321424822",
      currentCapacity: 85
    }
  ];

  // Determine relevant specialties based on condition
  let relevantSpecialties: string[] = ["General Medicine"]; // Default
  
  // Simple specialty mapping based on keywords in the condition
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes("heart") || conditionLower.includes("chest pain") || conditionLower.includes("cardiac")) {
    relevantSpecialties = ["Cardiology", "Emergency"];
  } else if (conditionLower.includes("gastritis") || conditionLower.includes("stomach") || conditionLower.includes("digest")) {
    relevantSpecialties = ["Gastroenterology", "General Medicine"];
  } else if (conditionLower.includes("bone") || conditionLower.includes("joint") || conditionLower.includes("fracture")) {
    relevantSpecialties = ["Orthopedics", "Emergency"];
  } else if (conditionLower.includes("skin") || conditionLower.includes("rash") || conditionLower.includes("allerg")) {
    relevantSpecialties = ["Dermatology", "General Medicine"];
  } else if (conditionLower.includes("brain") || conditionLower.includes("nerve") || conditionLower.includes("head")) {
    relevantSpecialties = ["Neurology", "Emergency"];
  }

  // Filter and rank hospitals by relevance, capacity, and urgency
  const rankedHospitals = hospitals
    .map(hospital => {
      // Calculate relevance score based on matching specialties
      const specialtyMatch = hospital.specialties.some(specialty => 
        relevantSpecialties.includes(specialty));
      
      // Calculate score based on urgency, capacity, and specialty match
      let score = 0;
      if (specialtyMatch) score += 5;
      if (hospital.specialistAvailability) score += 3;
      if (hospital.currentCapacity < 70) score += 2;
      if (urgencyLevel >= 7 && hospital.waitTime.includes("10-15")) score += 3;
      
      return { ...hospital, score };
    })
    .sort((a, b) => b.score - a.score)
    .map(({ score, specialties, currentCapacity, ...rest }) => {
      // Generate a suitability reason based on the hospital's attributes
      let suitabilityReason = "";
      
      if (urgencyLevel >= 8 && rest.waitTime.includes("10-15")) {
        suitabilityReason = "Low wait time for urgent cases";
      } else if (relevantSpecialties.some(s => specialties.includes(s))) {
        suitabilityReason = `Specialist available for ${condition}`;
      } else if (currentCapacity < 60) {
        suitabilityReason = "Low current capacity, shorter wait times likely";
      } else {
        suitabilityReason = "General care facility";
      }
      
      return { ...rest, suitabilityReason };
    });

  // Wait a bit to simulate an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Return top 3 hospitals
  return rankedHospitals.slice(0, 3);
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

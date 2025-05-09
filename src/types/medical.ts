export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  preferredLanguage: string;
  contactNumber: string;
  address?: string;
  email?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    contactNumber: string;
  };
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  date: string;
  diagnosis: string;
  treatment: string;
  doctorId: string;
  doctorName: string;
  notes?: string;
  medications?: Medication[];
  attachments?: Attachment[];
  followUpDate?: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: 'lab_result' | 'imaging' | 'prescription' | 'referral' | 'other';
  url: string;
  uploadDate: string;
}

export interface Consultation {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  type: 'video' | 'chat' | 'voice';
  symptoms: string;
  language: string;
  aiDiagnosis?: {
    translatedSymptoms?: string;
    possibleConditions: Array<{
      condition: string;
      confidence: number;
      icd10Code?: string;
    }>;
    urgencyLevel: number; // 1-10
    notes: string;
  };
  doctorNotes?: string;
  prescription?: Medication[];
  followUpRecommendation?: string;
  recordId?: string; // Reference to created medical record
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  languages: string[];
  availability: {
    [day: string]: { start: string; end: string }[];
  };
  rating?: number;
  hospitalId: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: string;
  contactNumber: string;
  email?: string;
  location: {
    latitude: number;
    longitude: number;
  };
  specialties: string[];
  facilities: string[];
  currentCapacity: number; // percentage
  waitTime: number; // minutes
}

export interface HospitalRecommendation {
  hospitalName: string;
  address: string;
  specialistAvailability: boolean;
  waitTime: string;
  distance: string;
  contactNumber: string;
  suitabilityReason?: string;
}

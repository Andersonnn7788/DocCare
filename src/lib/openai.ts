import { toast } from "sonner";

// OpenAI API configuration
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_MODEL = "gpt-3.5-turbo"; // Using GPT-3.5-turbo for reliable analysis

export const translateText = async ({ 
  text, 
  sourceLanguage = "auto", 
  targetLanguage 
}: TranslationRequest): Promise<string> => {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          {
            role: "system",
            content: `You are a medical translator. Translate the following text from ${sourceLanguage} to ${targetLanguage}. 
            Preserve medical terminology accurately and maintain the original meaning. 
            If there are any medical terms that don't have direct translations, provide the original term in parentheses.`
          },
          {
            role: "user",
            content: text
          }
        ],
        temperature: 0.1,
        max_tokens: 1000
      })
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message || "Translation failed");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Translation error:", error);
    toast.error("Translation failed. Please try again.");
    return text; // Return original text if translation fails
  }
};

export const generateDiagnosis = async ({ 
  patientDescription, 
  language = "en", 
  medicalRecords = [] 
}: DiagnosisRequest): Promise<DiagnosisResult> => {
  try {
    // First translate if not in English
    let processedDescription = patientDescription;
    if (language !== "en") {
      processedDescription = await translateText({
        text: patientDescription,
        sourceLanguage: language,
        targetLanguage: "en"
      });
    }

    // Format medical records for the prompt
    const medicalHistoryText = medicalRecords.length > 0 
      ? "Medical history:\n" + medicalRecords.map(record => 
          `- Date: ${record.date}\n  Diagnosis: ${record.diagnosis}\n  Treatment: ${record.treatment}\n  Notes: ${record.notes || "None"}`
        ).join("\n\n")
      : "No previous medical records available.";

    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          {
            role: "system",
            content: `You are an advanced AI medical assistant designed to provide preliminary analysis of patient symptoms. 
            You are NOT providing final diagnoses or medical advice. Your role is to help healthcare professionals by:
            1. Identifying possible conditions based on symptoms with high accuracy
            2. Assessing urgency on a scale of 1-10
            3. Suggesting relevant diagnostic tests
            4. Noting important factors for doctors to consider
            5. Identifying potential risk factors and red flags
            6. Considering patient's medical history in analysis
            
            Format your response as structured JSON with these fields:
            - possibleConditions: array of objects with:
              * condition: string (medical condition name)
              * confidence: number (0-1)
              * icd10Code: string (if known)
              * symptoms: string[] (matching symptoms)
              * riskLevel: string (low/medium/high)
            - urgencyLevel: number from 1-10, where 10 is highest urgency
            - recommendedTests: array of strings with test names and reasons
            - notes: string with important observations
            - redFlags: array of strings (warning signs that need immediate attention)
            - followUpQuestions: array of strings (questions to ask the patient)
            
            Be thorough but concise. Focus on accuracy and patient safety.`
          },
          {
            role: "user",
            content: `Patient description: ${processedDescription}\n\n${medicalHistoryText}`
          }
        ],
        temperature: 0.1,
        response_format: { type: "json_object" },
        max_tokens: 2000
      })
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message || "Diagnosis generation failed");
    }

    const diagnosisData = JSON.parse(data.choices[0].message.content);
    
    return {
      translatedDescription: language !== "en" ? processedDescription : undefined,
      possibleConditions: diagnosisData.possibleConditions,
      urgencyLevel: diagnosisData.urgencyLevel,
      recommendedTests: diagnosisData.recommendedTests,
      notes: diagnosisData.notes,
      redFlags: diagnosisData.redFlags || [],
      followUpQuestions: diagnosisData.followUpQuestions || []
    };
  } catch (error) {
    console.error("Diagnosis error:", error);
    toast.error("Failed to analyze symptoms. Please try again.");
    return {
      possibleConditions: [],
      urgencyLevel: 5,
      notes: "Error analyzing symptoms. Please consult with a healthcare professional directly.",
      redFlags: [],
      followUpQuestions: []
    };
  }
};

export const recommendHospitals = async ({
  condition,
  location,
  urgencyLevel,
  patientNeeds
}: HospitalRecommendationRequest): Promise<HospitalRecommendation[]> => {
  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          {
            role: "system",
            content: `You are a hospital recommendation system for Malaysia. Based on patient condition, location, and needs, provide 3 realistic hospital recommendations.
            
            Format your response as a JSON array of hospital objects, each with:
            - hospitalName: string (use realistic Malaysian hospital names)
            - distance: string (e.g., "3.2 km")
            - availabilityScore: number from 1-10, where 10 is highest availability
            - specialistAvailability: boolean (whether specialists for this condition are available)
            - waitTime: string (estimated wait time)
            - address: string (realistic Malaysian address)
            - contactNumber: string (realistic Malaysian phone number)
            - specialties: string[] (relevant medical specialties available)
            - emergencyServices: boolean (whether 24/7 emergency services are available)
            - insuranceAccepted: string[] (list of accepted insurance providers)
            
            Tailor recommendations based on:
            1. Urgency level of the condition
            2. Required medical specialties
            3. Patient's location
            4. Hospital's current capacity
            5. Available emergency services if needed`
          },
          {
            role: "user",
            content: `Patient condition: ${condition}\nLocation: ${location}\nUrgency level: ${urgencyLevel}/10\nSpecial needs: ${patientNeeds.join(", ")}`
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
        max_tokens: 1000
      })
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message || "Hospital recommendation failed");
    }

    const recommendationsData = JSON.parse(data.choices[0].message.content);
    return recommendationsData.hospitals || [];
  } catch (error) {
    console.error("Hospital recommendation error:", error);
    toast.error("Failed to get hospital recommendations. Please try again.");
    return [];
  }
};

// Type definitions
export type TranslationRequest = {
  text: string;
  sourceLanguage?: string;
  targetLanguage: string;
};

export type DiagnosisRequest = {
  patientDescription: string;
  language?: string;
  medicalRecords?: MedicalRecord[];
};

export type MedicalRecord = {
  date: string;
  diagnosis: string;
  treatment: string;
  notes?: string;
};

export type HospitalRecommendationRequest = {
  condition: string;
  location: string;
  urgencyLevel: number;
  patientNeeds: string[];
};

export type DiagnosisResult = {
  translatedDescription?: string;
  possibleConditions: Array<{
    condition: string;
    confidence: number;
    icd10Code?: string;
    symptoms?: string[];
    riskLevel?: string;
  }>;
  urgencyLevel: number;
  recommendedTests?: string[];
  notes: string;
  redFlags?: string[];
  followUpQuestions?: string[];
};

export type HospitalRecommendation = {
  hospitalName: string;
  distance: string;
  availabilityScore: number;
  specialistAvailability: boolean;
  waitTime: string;
  address: string;
  contactNumber: string;
  specialties?: string[];
  emergencyServices?: boolean;
  insuranceAccepted?: string[];
};

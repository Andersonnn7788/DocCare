
import { toast } from "sonner";
import { useState } from "react";

// Store the API key in localStorage for demo purposes
let OPENAI_API_KEY = localStorage.getItem("openai_api_key");

// Function to set the API key
export const setOpenAIApiKey = (apiKey: string) => {
  OPENAI_API_KEY = apiKey;
  localStorage.setItem("openai_api_key", apiKey);
  return true;
};

export const getOpenAIApiKey = () => {
  return OPENAI_API_KEY;
};

// Hook to check if API key is set
export const useOpenAIApiKey = () => {
  const [apiKey, setApiKey] = useState(OPENAI_API_KEY || "");
  
  const saveApiKey = (key: string) => {
    setApiKey(key);
    setOpenAIApiKey(key);
  };
  
  return { 
    apiKey, 
    setApiKey: saveApiKey, 
    isKeySet: Boolean(OPENAI_API_KEY)
  };
};

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
  urgencyLevel: number; // 1-10
  patientNeeds: string[];
};

export type DiagnosisResult = {
  translatedDescription?: string;
  possibleConditions: Array<{
    condition: string;
    confidence: number;
    icd10Code?: string;
  }>;
  urgencyLevel: number; // 1-10
  recommendedTests?: string[];
  notes: string;
};

export type HospitalRecommendation = {
  hospitalName: string;
  distance: string;
  availabilityScore: number; // 1-10
  specialistAvailability: boolean;
  waitTime: string; // estimated wait time
  address: string;
  contactNumber: string;
};

export const translateText = async ({ 
  text, 
  sourceLanguage = "auto", 
  targetLanguage 
}: TranslationRequest): Promise<string> => {
  try {
    // Check if API key is set
    if (!OPENAI_API_KEY) {
      throw new Error("OpenAI API key not set");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a medical translator. Translate the following text from ${sourceLanguage} to ${targetLanguage}. Preserve medical terminology accurately.`
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
    // Check if API key is set
    if (!OPENAI_API_KEY) {
      throw new Error("OpenAI API key not set");
    }

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

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an AI medical assistant designed to provide preliminary analysis of patient symptoms. 
            You are NOT providing final diagnoses or medical advice. Your role is to help healthcare professionals by:
            1. Identifying possible conditions based on symptoms
            2. Assessing urgency on a scale of 1-10
            3. Suggesting relevant diagnostic tests
            4. Noting important factors for doctors to consider
            
            Format your response as structured JSON with these fields:
            - possibleConditions: array of objects with condition name, confidence (0-1), and ICD10 code if known
            - urgencyLevel: number from 1-10, where 10 is highest urgency
            - recommendedTests: array of strings
            - notes: string with important observations
            
            Include key risk factors and correlations with medical history when available.`
          },
          {
            role: "user",
            content: `Patient description: ${processedDescription}\n\n${medicalHistoryText}`
          }
        ],
        temperature: 0.1,
        response_format: { type: "json_object" },
        max_tokens: 1500
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
      notes: diagnosisData.notes
    };
  } catch (error) {
    console.error("Diagnosis error:", error);
    toast.error("Failed to analyze symptoms. Please try again.");
    return {
      possibleConditions: [],
      urgencyLevel: 5,
      notes: "Error analyzing symptoms. Please consult with a healthcare professional directly."
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
    // Check if API key is set
    if (!OPENAI_API_KEY) {
      throw new Error("OpenAI API key not set");
    }
    
    // In a production app, this would connect to a real hospital database API
    // For now, we'll use OpenAI to simulate realistic recommendations
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
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
            
            Tailor recommendations based on urgency level and specific medical needs.`
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
